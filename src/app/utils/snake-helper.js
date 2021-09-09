import { MAP_HEIGHT, MAP_WIDTH } from '../constants'

export const getSnakesInitialPosition = () => {
    
    const x = Math.floor(MAP_WIDTH * .25);
    const y = Math.floor(MAP_HEIGHT * .5) - 1;

    return { x, y };
}

export const getSnakeBodyTextureRotation = (cell) => {
    if (cell.vy === -1) {
        return 0;
    } else if (cell.vy === 1) {
        return Math.PI;
    } else if (cell.vx === 1) {
        return Math.PI / 2;
    } else if (cell.vx === -1) {
        return (Math.PI / 2) * 3;
    }
}

export const getSnakeCornerTextureRotation = (previousNode, nextNode) => {

    if (!nextNode || !previousNode) {
        return undefined;
    }

    if ((previousNode.vx === -1 && nextNode.vy === 1) || (previousNode.vy === -1 && nextNode.vx === 1)) {
        return 0;
    } else if ((previousNode.vx === 1 && nextNode.vy === 1) || (previousNode.vy === -1 && nextNode.vx === -1)) {
        return Math.PI / 2;
    } else if ((previousNode.vx === 1 && nextNode.vy === -1) || (previousNode.vy === 1 && nextNode.vx === -1)) {
        return Math.PI;
    } else if ((previousNode.vx === -1 && nextNode.vy === -1) || (previousNode.vy === 1 && nextNode.vx === 1)) {
        return (Math.PI / 2) * 3;
    }
}