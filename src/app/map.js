import { SCALE_MODES } from '@pixi/constants';
import { Container } from '@pixi/display';
import { Graphics } from '@pixi/graphics';
import { Matrix } from '@pixi/math';
import { CELL_HEIGHT, CELL_WIDTH, CIRCULAR_MAP, MAP_HEIGHT, MAP_WIDTH } from './constants';
import { getSnakeBodyTextureRotation, getSnakeCornerTextureRotation } from './utils/snake-helper';

export class Map {

    mapArray;
    mapContainer;
    snake
    apple

    constructor(snake, resources) {
        this.mapArray = [];
        this.mapContainer = new Container();
        this.initializeMap();
        this.snake = snake;
        this.resources = resources;
    }

    get mapArray () {
        return this.mapArray;
    }

    get mapContainer () {
        return this.mapContainer;
    }


    initializeMap() {
        for (let x = 0; x < MAP_WIDTH; x++) {
            this.mapArray[x] = [];
            for (let y = 0; y < MAP_HEIGHT; y++) {
                const rectangle = new Graphics();
                rectangle.drawRect(0, 0, CELL_WIDTH, CELL_HEIGHT);
                rectangle.empty = true;
                rectangle.x = x * CELL_WIDTH;
                rectangle.y = y * CELL_HEIGHT;

                this.mapContainer.addChild(rectangle);
                this.mapArray[x][y] = rectangle;
            }
        }
    }

    updateMap() {
        for (let x = 0; x < MAP_WIDTH; x++) {
            for (let y = 0; y < MAP_HEIGHT; y ++) {
                const cell = this.mapArray[x][y];
                const snakeNode = this.snake.snakeArray.find((node) => node.x === x && node.y === y);
                const snakeNodeIndex = this.snake.snakeArray.indexOf(snakeNode);
                const previousNode = this.snake.snakeArray[snakeNodeIndex - 1];
                const nextNode = this.snake.snakeArray[snakeNodeIndex + 1];


                if (!!snakeNode) {
                    cell.changed = !!cell.empty
                    cell.empty = false;
                    cell.hasSnake = true;
                    cell.vx = snakeNode.vx;
                    cell.vy = snakeNode.vy;
                    cell.isCorner = snakeNode.isCorner;
                    cell.previousNode = previousNode;
                    cell.nextNode = nextNode;
                } else {
                    cell.changed = !cell.empty
                    cell.empty = true && !cell.hasApple;
                    cell.hasSnake = false;
                    cell.vx = 0;
                    cell.vy = 0;
                    cell.isCorner = false;
                    cell.previousNode = undefined;
                    cell.nextNode = undefined;
                }
            }
        }
    }

    redrawMap() {
        for(let i = 0; i < this.mapContainer.children.length; i++) {
            const cell = this.mapContainer.getChildAt(i);
            if (cell.changed) {
                cell.clear();
                if (cell.hasApple) {
                    const texture = this.resources.apple.texture;
                    texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

                    cell.beginTextureFill({
                        texture,
                    });
                } else if (cell.hasSnake) {
                    // if (cell.isCorner) {
                    //     const texture = this.resources.snakeBody.texture;
                    //     texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
                    //     const rotation = getSnakeCornerTextureRotation(cell.previousNode, cell.nextNode);
    
                    //     cell.beginTextureFill({
                    //         texture,
                    //         matrix: new Matrix().rotate(rotation),
                    //     });
                    // } else {
                        const texture = this.resources.snakeBody.texture;
                        texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
                        const rotation = getSnakeBodyTextureRotation(cell);
    
                        cell.beginTextureFill({
                            texture,
                            matrix: new Matrix().rotate(rotation),
                        });
                    // }
                }
                cell.drawRect(0, 0, CELL_WIDTH, CELL_HEIGHT);
            }

            cell.changed = false;
        }
    }

    spawnApple() {
        const emptyCells = this.mapContainer.children.filter(cell => cell.empty);
        const randomCell = emptyCells[Math.round(Math.random() * emptyCells.length)];
        const cellReference = this.mapContainer.children.find(_ => _ === randomCell);

        cellReference.hasApple = true;
        cellReference.empty = false;
        cellReference.changed = true;

        this.apple = cellReference;
    }

    clearApple() {
        this.apple.hasApple = false;
        this.apple.empty = true;
        this.apple.changed = true;

        this.apple = undefined;
    }

    checkGameRules() {
        const snakeHead = this.snake.head;

        const isSnakeHeadOutOfBounds = () => {
            return snakeHead.x === MAP_WIDTH ||
                snakeHead.x < 0 ||
                snakeHead.y === MAP_HEIGHT ||
                snakeHead.y < 0
        }

        if (!CIRCULAR_MAP && isSnakeHeadOutOfBounds()) {
            throw 'SNAKE_OUT_OF_BOUNDS';
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

            return this.mapArray[x][y] === this.apple;
        }

        if (this.snake.isBitingSelf()) {
            throw 'SNAKE_BIT_ITSELF';
        }

        if (didSnakeEatApple()) {
            this.clearApple();
            this.spawnApple();
            this.snake.grow();
        }
    }
}