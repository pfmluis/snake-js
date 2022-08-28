import buildMakeApple from './apple';
import buildMakeCell from './cell';
import buildMakeNode from './node';

describe('Apple', () => {
  const makeApple = buildMakeApple()
  const makeCell = buildMakeCell()

  it('should place apple in one of the provided cells', () => {
    const sut = makeApple()

    const emptyCells = [makeCell({ x: 0, y: 0}), makeCell({ x: 1, y: 0}), makeCell({ x: 2, y: 0 })]
    sut.placeApple(emptyCells)

    const cell = emptyCells.find((cell) => cell.getX() == sut.getX() && cell.getY() == sut.getY())
    expect(cell).toBeDefined()
  });
})
