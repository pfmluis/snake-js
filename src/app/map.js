import { Container } from '@pixi/display';
import { Graphics } from '@pixi/graphics';
import { CELL_HEIGHT, CELL_WIDTH, MAP_HEIGHT, MAP_WIDTH } from './constants';

export class Map {

    mapArray;
    mapContainer;

    constructor() {
        this.mapArray = [];
        this.mapContainer = new Container();
        this.initializeMap();
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

    redrawMap() {
        for(let i = 0; i < this.mapContainer.children.length; i++) {
            const cell = this.mapContainer.getChildAt(i);

            if (cell.changed) {
                cell.clear();
                cell.lineStyle(1, 0);
                cell.beginFill(cell.empty ? 0 : 0xffffff);
                cell.drawRect(0, 0, CELL_WIDTH, CELL_HEIGHT);
            }
            
            cell.changed = false;
        }
    }
}