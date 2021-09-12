import { Application, Loader } from 'pixi.js';
import { drawFrame } from './frame';
import { Map } from './map';
import centerStageHelper from './utils/center-stage-helper';
import resizeHelper, { resize } from './utils/resize-helper';
import { Snake } from './snake';
import { getSnakesInitialPosition } from './utils/snake-helper'
import { setupKeyboardMaps } from './utils/keyboard-helpers';
import { setupTouchMaps } from './utils/touch-helpers';
import { GAME_SPEED } from './constants';

export default () => {
    const app = new Application({
        width: window.innerWidth,
        height: window.innerHeight, 
    });

    app.renderer.backgroundColor = 0x949c86;
    const loader = new Loader();

    loader
        .add('apple', 'apple.png')
        .add('map', 'map.png')
        .add('snakeBody', 'snake-body.png')
        .add('snakeCorner', 'snake-corner.png')
        .add('snakeHead', 'snake-head.png')
        .add('snakeTail', 'snake-tail.png')
        .load((_, resources) => {

            const snakeInitialPosition = getSnakesInitialPosition();
            const snake = new Snake(snakeInitialPosition.x, snakeInitialPosition.y);

            const map = new Map(snake, resources);
            map.updateMap(snake.snakeArray);
            map.spawnApple();
            map.redrawMap();
        
            const frame = drawFrame(map.mapContainer, resources.map.texture);
            app.stage.addChild(frame);
        
            setupKeyboardMaps(snake, map);
            setupTouchMaps(snake);
            
            const ticker = () => {
                snake.move();
                map.checkGameRules();
                map.updateMap();
                map.redrawMap();
        
                setTimeout(() => {
                    requestAnimationFrame(ticker);
                }, GAME_SPEED);
            }
        
            ticker();            
                
            document.body.appendChild(app.view);
            centerStageHelper(app);
            resizeHelper(app);
            resize(app);
        })
}