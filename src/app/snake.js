export class Snake {

    snakeArray;

    constructor(
        initialX,
        initialY
    ) {
        this.vx = 0;
        this.vy = 0;
        this.snakeArray = [{
            x: initialX,
            y: initialY,
            vy: 0,
            vx: 1,
            isHead: true
        }, {
            x: initialX - 1,
            y: initialY,
            vy: 0,
            vx: 1
        }, {
            x: initialX - 2,
            y: initialY,
            vy: 0,
            vx: 1,
            isTail: true
        }];
    }

    get snakeArray() {
        return this.snakeArray;
    }

    set snakeArray (_) { }

    get head() {
        return this.snakeArray[0];
    }

    move() {
        if (this.vx === 0 && this.vy === 0) {
            return
        }

        const snakeHead = this.snakeArray[0];
        snakeHead.isCorner = snakeHead.vx !== this.vx || snakeHead.vy !== this.vy;
        snakeHead.isHead = false;

        this.snakeArray.unshift({ 
            x: snakeHead.x + this.vx,
            y:snakeHead.y + this.vy,
            vx: this.vx,
            vy: this.vy,
            isHead: true,
        });
        this.snakeArray.pop();
        this.snakeArray[this.snakeArray.length - 1].isTail = true;
    }

    grow() {
        this.snakeArray.push({})
    }

    isBitingSelf() {
        const [ head, ...body] = this.snakeArray;

        return body.some((bodyPart) => bodyPart.x === head.x && bodyPart.y === head.y);
    }

    moveUp() {
        if (this.head.vy === 1) { return }

        this.vy = -1;
        this.vx = 0;
    }

    moveDown() {
        if (this.head.vy === -1) { return }

        this.vy = 1;
        this.vx = 0;
    }

    moveLeft() {
        if (this.head.vx === 1) { return }

        this.vy = 0;
        this.vx = -1;
    }

    moveRight() {
        if (this.head.vx === -1) { return }

        this.vy = 0;
        this.vx = 1;
    }    
}