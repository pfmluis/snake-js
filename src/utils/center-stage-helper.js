export default (app) => {
    app.stage.position.set(
        window.innerWidth / 2 - app.stage.width / 2,
        window.innerHeight / 2 - app.stage.height / 2,
    )
}