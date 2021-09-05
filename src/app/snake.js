export class Snake {

    snakeArray;

    constructor(
        initialX,
        initialY
    ) {
        this.snakeArray = [];
        this.snakeArray.push({
            x: initialX,
            y: initialY,
        });
    }

    get snakeArray() {
        return this.snakeArray;
    }

    set snakeArray (_) { }
}