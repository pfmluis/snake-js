import { MAP_HEIGHT, MAP_WIDTH } from '../constants'

export const getSnakesInitialPosition = () => {
    
    const x = Math.floor(MAP_WIDTH * .25);
    const y = Math.floor(MAP_HEIGHT * .5) - 1;

    return { x, y };
}