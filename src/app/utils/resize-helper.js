import centerStageHelper from './center-stage-helper';

export default (app) => {
    window.onresize = () => {
        app.renderer.resize(window.innerWidth, innerHeight);

        centerStageHelper(app);
    }
}