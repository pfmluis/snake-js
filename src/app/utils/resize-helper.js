import { MAP_NET_HEIGHT } from '../constants';
import centerStageHelper from './center-stage-helper';

export const resize = (app) => {
    app.renderer.resize(innerWidth, innerHeight);

    const frame = app.stage.children[0];

    const scaleW = (innerWidth - 20) / MAP_NET_HEIGHT;
    const scaleH = (innerHeight - 50) / MAP_NET_HEIGHT;

    const mininalScale = Math.min(scaleW, scaleH);
    frame.scale.set(mininalScale, mininalScale);

    centerStageHelper(app);
}

export default (app) => {
    window.onresize = () => resize(app);
}