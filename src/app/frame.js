import { SCALE_MODES } from '@pixi/constants';
import { Graphics } from '@pixi/graphics'
import { Matrix } from '@pixi/math';
import { CELL_HEIGHT, CELL_WIDTH, MAP_HEIGHT, MAP_WIDTH } from './constants';

export const drawFrame = (map, texture) => {
    const frame = new Graphics();
    texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

    frame.addChild(map);
    frame.beginTextureFill({
        texture,
    });
    frame.drawRect(0, 0, MAP_WIDTH * CELL_WIDTH, MAP_HEIGHT * CELL_HEIGHT);

    return frame;
}