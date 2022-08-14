import { Container } from '@pixi/display'
import { Text } from '@pixi/text';
import { GAME_OVER_CONTAINER_NAME } from '../constants';

export const getGameOverContainer = (frame) => {
    const gameOverContainer = new Container();
    gameOverContainer.name = GAME_OVER_CONTAINER_NAME;

    const gameOverText = new Text('GAME OVER', {
        fontFamily: "fonts/PressStart2P-Regular.ttf",
        fontSize: 48,
        fill: "#303326",
    });
    gameOverText.y = (frame.height / 2) - (gameOverText.height / 2) - 64;
    gameOverText.x = (frame.width / 2) - (gameOverText.width / 2);

    const restartGameText = new Text('To restart the game press "R"', {
        fontFamily: "fonts/PressStart2P-Regular.ttf",
        fontSize: 24,
        fill: "#303326",
    });
    restartGameText.y = (frame.height / 2) - (gameOverText.height / 2) + 64;
    restartGameText.x = (frame.width / 2) - (gameOverText.width / 2);

    gameOverText

    gameOverContainer.addChild(gameOverText);
    gameOverContainer.addChild(restartGameText);

    return gameOverContainer;
}