import { Graphics } from '@pixi/graphics'
import { CELL_HEIGHT, CELL_WIDTH, MAP_HEIGHT, MAP_WIDTH } from './constants';

export const drawFrame = (map) => {
    const frame = new Graphics();
    frame.addChild(map);
    frame.lineStyle(5, 0xffffff);
    frame.drawRect(0, 0, MAP_WIDTH * CELL_WIDTH, MAP_HEIGHT * CELL_HEIGHT);

    return frame;
}