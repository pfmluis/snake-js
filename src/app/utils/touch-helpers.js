const Hammer = require('hammerjs');

export const setupTouchMaps = (snake) => {

    var hammer = new Hammer(document.body);

    hammer.on('panleft', () => {
        snake.moveLeft();
    });

    hammer.on('panright', () => {
        snake.moveRight();
    });

    hammer.on('panup', () => {
        snake.moveUp();
    });

    hammer.on('pandown', () => {
        snake.moveDown();
    });
}