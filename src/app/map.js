import { SCALE_MODES } from '@pixi/constants';
import { Container } from '@pixi/display';
import { Graphics } from '@pixi/graphics';
import { Matrix } from '@pixi/math';
import { CELL_HEIGHT, CELL_WIDTH, CIRCULAR_MAP, GAME_COINTAINER_NAME, MAP_HEIGHT, MAP_WIDTH } from './constants';
import { getSnakeBodyTextureRotation, getSnakeCornerTextureRotation, getSnakesInitialPosition } from './utils/snake-helper';

export class Map {

    _mapArray;
    _mapContainer;
    _snake;
    _apple;
    _isGameOver;
    _score;


    constructor(snake, resources) {
        this._mapArray = [];
        this._mapContainer = new Container();
        this._mapContainer.name = GAME_COINTAINER_NAME;
        this.initializeMap();
        this._snake = snake;
        this.resources = resources;
        this._isGameOver = false;
        this._score = 0;
    }

    get mapArray () {
        return this._mapArray;
    }

    get mapContainer () {
        return this._mapContainer;
    }

    get isGameOver () {
        return this._isGameOver;
    }

    get score() {
        return this._score;
    }

    initializeMap() {
        for (let x = 0; x < MAP_WIDTH; x++) {
            this._mapArray[x] = [];
            for (let y = 0; y < MAP_HEIGHT; y++) {
                const rectangle = new Graphics();
                rectangle.drawRect(0, 0, CELL_WIDTH, CELL_HEIGHT);
                rectangle.empty = true;
                rectangle.x = x * CELL_WIDTH;
                rectangle.y = y * CELL_HEIGHT;

                this._mapContainer.addChild(rectangle);
                this._mapArray[x][y] = rectangle;
            }
        }
    }

    updateMap() {
        for (let x = 0; x < MAP_WIDTH; x++) {
            for (let y = 0; y < MAP_HEIGHT; y ++) {
                const cell = this._mapArray[x][y];
                const snakeNode = this._snake.snakeArray.find((node) => node.x === x && node.y === y);
                const snakeNodeIndex = this._snake.snakeArray.indexOf(snakeNode);

                if (snakeNode) {
                    cell.changed = true;
                    cell.empty = false;
                    cell.hasSnake = true;
                    cell.vx = snakeNode.vx;
                    cell.vy = snakeNode.vy;
                    cell.isCorner = snakeNode.isCorner;
                    cell.previousNode = this._snake.snakeArray[snakeNodeIndex];
                    cell.nextNode = this._snake.snakeArray[snakeNodeIndex - 1];
                    cell.isHead = snakeNode.isHead;
                    cell.isTail = snakeNode.isTail;
                } else {
                    cell.changed = !cell.empty || cell.changed;
                    cell.empty = true && !cell.hasApple;
                    cell.hasSnake = false;
                    cell.vx = 0;
                    cell.vy = 0;
                    cell.isCorner = false;
                    cell.previousNode = undefined;
                    cell.nextNode = undefined;
                    cell.isHead = false;
                    cell.isTail = false;
                }
            }
        }
    }

    restart() {
        this._isGameOver = false;
        this._score = 0;
        const { x, y } = getSnakesInitialPosition();
        this._snake.spawn(x, y);
        this.clearApple();
        this.spawnApple();
    }

    redrawMap() {
        if (this._isGameOver) { return; }
        for(let i = 0; i < this._mapContainer.children.length; i++) {
            const cell = this._mapContainer.getChildAt(i);
            if (cell.changed) {
                cell.clear();
                if (cell.hasApple) {
                    const texture = this.resources.apple.texture;
                    texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

                    cell.beginTextureFill({
                        texture,
                    });
                } else if (cell.hasSnake) {
                    if (cell.isHead) {
                        const texture = this.resources.snakeHead.texture;
                        texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
                        const rotation = getSnakeBodyTextureRotation(cell);
    
                        cell.beginTextureFill({
                            texture,
                            matrix: new Matrix().rotate(rotation)
                        });
                    } else if (cell.isTail) {
                        if (cell.isCorner) {
                            const texture = this.resources.snakeCorner.texture;
                            texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
                            const rotation = getSnakeCornerTextureRotation(cell.previousNode, cell.nextNode);
        
                            cell.beginTextureFill({
                                texture,
                                matrix: new Matrix()
                                    .rotate(rotation)
                            });
                        } else {
                            const texture = this.resources.snakeTail.texture;
                            texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
                            const rotation = getSnakeBodyTextureRotation(cell);
        
                            cell.beginTextureFill({
                                texture,
                                matrix: new Matrix().rotate(rotation)
                            });
                        }
                    } else if (cell.isCorner) {
                        const texture = this.resources.snakeCorner.texture;
                        texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
                        const rotation = getSnakeCornerTextureRotation(cell.previousNode, cell.nextNode);
    
                        cell.beginTextureFill({
                            texture,
                            matrix: new Matrix().rotate(rotation)
                        });
                    } else {
                        const texture = this.resources.snakeBody.texture;
                        texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
                        const rotation = getSnakeBodyTextureRotation(cell);
    
                        cell.beginTextureFill({
                            texture,
                            matrix: new Matrix().rotate(rotation)
                        });
                    }
                }
                cell.drawRect(0, 0, CELL_WIDTH, CELL_HEIGHT);
            }

            cell.changed = false;
        }
    }

    spawnApple() {
        const emptyCells = this._mapContainer.children.filter(cell => cell.empty);
        const randomCell = emptyCells[Math.round(Math.random() * emptyCells.length)];
        const cellReference = this._mapContainer.children.find(_ => _ === randomCell);

        cellReference.hasApple = true;
        cellReference.empty = false;
        cellReference.changed = true;

        this._apple = cellReference;
    }

    clearApple() {
        this._apple.hasApple = false;
        this._apple.empty = true;
        this._apple.changed = true;

        this._apple = undefined;
    }

    checkGameRules() {
        const snakeHead = this._snake.head;

        const isSnakeHeadOutOfBounds = () => {
            return snakeHead.x === MAP_WIDTH ||
                snakeHead.x < 0 ||
                snakeHead.y === MAP_HEIGHT ||
                snakeHead.y < 0
        }

        if (!CIRCULAR_MAP && isSnakeHeadOutOfBounds()) {
            this._isGameOver = true;
        }

        if (CIRCULAR_MAP) {
            if (snakeHead.x < 0) {
                snakeHead.x = MAP_WIDTH - 1;
            } else if (snakeHead.x === MAP_WIDTH) {
                snakeHead.x = 0
            } else if (snakeHead.y < 0) {
                snakeHead.y = MAP_HEIGHT - 1;
            } else if (snakeHead.y === MAP_HEIGHT) {
                snakeHead.y = 0
            }
        }

        const didSnakeEatApple = () => {
            const x = snakeHead.x;
            const y = snakeHead.y;

            return this._mapArray?.[x]?.[y] === this._apple;
        }

        if (this._snake.isBitingSelf()) {
            this._isGameOver = true;
            console.log(this._score);
        }

        if (didSnakeEatApple()) {
            this.clearApple();
            this.spawnApple();
            this._snake.grow();
            this._score++;
        }
    }
}