import { Application } from 'pixi.js';
import { drawFrame } from './frame';
import { Map } from './map';
import centerStageHelper from './utils/center-stage-helper';
import resizeHelper from './utils/resize-helper';
import { Snake } from './snake';
import { getSnakesInitialPosition } from './utils/snake-helper'
import { setupKeyboardMaps } from './utils/keyboard-helpers';

export default () => {
    const app = new Application({
        width: window.innerWidth,
        height: window.innerHeight, 
    });

    
    const snakeInitialPosition = getSnakesInitialPosition();
    const snake = new Snake(snakeInitialPosition.x, snakeInitialPosition.y);
    
    const map = new Map(snake);
    map.updateMap(snake.snakeArray);
    map.spawnApple();
    map.redrawMap();

    const frame = drawFrame(map.mapContainer);
    app.stage.addChild(frame);

    setupKeyboardMaps(snake);
    
    const ticker = () => {
        snake.move();
        map.updateMap();
        map.checkGameRules();
        map.redrawMap();

        setTimeout(() => {
            requestAnimationFrame(ticker);
        }, 100);
    }

    ticker();

    document.body.appendChild(app.view);

    centerStageHelper(app);
    resizeHelper(app);
}