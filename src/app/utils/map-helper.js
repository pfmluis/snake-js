import { CELL_HEIGHT, CELL_WIDTH } from '../constants';

export const fillCell = (cell) => {
    cell.clear();
    cell.beginFill(0xffffff);
    cell.drawRect(0, 0, CELL_WIDTH, CELL_HEIGHT);
    cell.empty = false;
    cell.changed = true;
}

export const emptyCell = (cell) => {

}