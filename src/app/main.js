import { Application } from 'pixi.js';
import { drawFrame } from './frame';
import { Map } from './map';
import centerStageHelper from './utils/center-stage-helper';
import resizeHelper from './utils/resize-helper';
import { Snake } from './snake';
import { fillCell } from './utils/map-helper';
import { getSnakesInitialPosition } from './utils/snake-helper'

export default () => {
    const app = new Application({
        width: window.innerWidth,
        height: window.innerHeight, 
    });

    const map = new Map();
    const mapArray = map.mapArray;
    const mapContainer = map.mapContainer;

    const snakeInitialPosition = getSnakesInitialPosition();
    const snake = new Snake(snakeInitialPosition.x, snakeInitialPosition.y);

    snake.snakeArray.forEach(node => {
        const snakeNode = mapArray[node.x][node.y];

        fillCell(snakeNode);
    });

    const frame = drawFrame(mapContainer);
    app.stage.addChild(frame);

    app.ticker.add((delta) => { map.redrawMap(); console.log(delta) })

    document.body.appendChild(app.view);

    centerStageHelper(app);
    resizeHelper(app);
}