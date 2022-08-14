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
import { getGameOverContainer } from './utils/game-over-helper';

export default () => {
    const app = new Application({
        width: window.innerWidth,
        height: window.innerHeight, 
    });

    app.renderer.backgroundColor = 0x949c86;
    const loader = new Loader();

    loader
        .add('apple', 'images/apple.png')
        .add('map', 'images/map.png')
        .add('snakeBody', 'images/snake-body.png')
        .add('snakeCorner', 'images/snake-corner.png')
        .add('snakeHead', 'images/snake-head.png')
        .add('snakeTail', 'images/snake-tail.png')
        .load((_, resources) => {

            const snakeInitialPosition = getSnakesInitialPosition();
            const snake = new Snake(snakeInitialPosition.x, snakeInitialPosition.y);

            const map = new Map(snake, resources);
            map.updateMap(snake.snakeArray);
            map.spawnApple();
            map.redrawMap();

            
            const frame = drawFrame(map, resources.map.texture);
            const gameOverScreen = getGameOverContainer(frame);
            frame.addChild(gameOverScreen);
            app.stage.addChild(frame);
        
            setupKeyboardMaps(snake, map);
            setupTouchMaps(snake);
            
            const ticker = () => {
                if (!map.isGameOver) {
                    gameOverScreen.visible = false;
                    map._mapContainer.visible = true;
                    snake.move();
                    map.checkGameRules();
                    map.updateMap();
                    map.redrawMap();
                } else {
                    gameOverScreen.visible = true;
                    map._mapContainer.visible = false;
                }
        
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