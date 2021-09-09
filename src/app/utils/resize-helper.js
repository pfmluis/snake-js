import centerStageHelper from './center-stage-helper';

export const resize = (app) => {
    const frame = app.stage.children[0];
        const scaleW = (innerWidth - 20)  / frame.width;
        const scaleH = (innerHeight - 50) / frame.height;

        const minimalScale = Math.min(scaleW, scaleH);
    

        frame.scale.set(minimalScale, minimalScale);

        app.renderer.resize(window.innerWidth, window.innerHeight);
        centerStageHelper(app);
}

export default (app) => {
    window.onresize = () => resize(app);
}