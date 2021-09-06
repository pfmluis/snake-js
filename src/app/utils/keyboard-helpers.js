export const setupKeyboardMaps = (snake) => {

    addEventListener('keydown', ({ key }) => {
        switch(key) {
            case 'w':
            case 'ArrowUp':
                snake.moveUp();
                break;
            case 's':
            case 'ArrowDown':
                snake.moveDown();
                break;
            case 'a':
            case 'ArrowLeft':
                snake.moveLeft();
                break;
            case 'd':
            case 'ArrowRight':
                snake.moveRight();
                break;
        }

    })

}