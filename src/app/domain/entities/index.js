import buildMakeNode from './node';
import buildMakeCell from './cell';
import buildMakeSnake from './snake';
import buildMakeMap from './map';

const makeNode = buildMakeNode()
const makeCell = buildMakeCell()
const makeSnake = buildMakeSnake(makeNode)
const makeMap = buildMakeMap(makeCell)

export default Object.freeze({
  makeMap,
  makeSnake,
})