import { Container } from '@pixi/display';
import { Graphics } from '@pixi/graphics';
import { CELL_HEIGHT, CELL_WIDTH, MAP_HEIGHT, MAP_WIDTH } from './constants';

export class Map {

    mapArray;
    mapContainer;
    snake
    apple

    constructor(snake) {
        this.mapArray = [];
        this.mapContainer = new Container();
        this.initializeMap();
        this.snake = snake;
    }

    get mapArray () {
        return this.mapArray;
    }

    get mapContainer () {
        return this.mapContainer;
    }

    set mapArray (_) {}
    set mapContainer (_) {}

    initializeMap() {
        for (let x = 0; x < MAP_WIDTH; x++) {
            this.mapArray[x] = [];
            for (let y = 0; y < MAP_HEIGHT; y++) {
                const rectangle = new Graphics();
                rectangle.lineStyle(1, 0);
                rectangle.beginFill(0);
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

                if (!!snakeNode) {
                    cell.changed = !!cell.empty
                    cell.empty = false;
                } else {
                    cell.changed = !cell.empty
                    cell.empty = true && !cell.hasApple;
                }
            }
        }
    }

    redrawMap() {
        for(let i = 0; i < this.mapContainer.children.length; i++) {
            const cell = this.mapContainer.getChildAt(i);
            if (cell.changed) {
                const color = cell.empty ? 0 : cell.hasApple ? 0xff0000 : 0xffffff;

                cell.clear();
                cell.lineStyle(1, 0);
                cell.beginFill(color);
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
        this.apple.empty = false;
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

        if (isSnakeHeadOutOfBounds()) {
            throw 'SNAKE_OUT_OF_BOUNDS';
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
            this.snake.grow();
            this.spawnApple();
        }
    }
}