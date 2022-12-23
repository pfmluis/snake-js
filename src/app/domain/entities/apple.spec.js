import buildMakeApple from './apple';
import buildMakeCell from './cell';

const makeCellMock = () => ({
  setHasApple: (sha) => sha,
  getX: () => 0,
  getY: () => 0,
})

describe('Apple', () => {
  const makeApple = buildMakeApple()
  const makeCell = buildMakeCell()

  it('should place apple in one of the provided cells', () => {
    const sut = makeApple()

    const cells = [makeCell({ x: 0, y: 0}), makeCell({ x: 1, y: 0}), makeCell({ x: 2, y: 0 })]
    sut.placeApple(cells)

    const cell = cells.find((cell) => cell.getX() == sut.getX() && cell.getY() == sut.getY())
    expect(cell).toBeDefined()

    const cellWithApple = cells.find((cell) => cell.hasApple())
    expect(cellWithApple).toBeDefined()
  });

  it('should remove apple from map', () => {
    const sut = makeApple()
    const cells = [makeCellMock(), makeCellMock(), makeCellMock(), makeCellMock()]
    const cellMock = makeCellMock()
    const setHasAppleSpy = jest.spyOn(cellMock, 'setHasApple')
    const cellsMatrix = [[cellMock, cells[1]], [cells[2], cells[3]]]
    
    sut.placeApple(cells)
    sut.removeApple(cellsMatrix)

    expect(setHasAppleSpy).toHaveBeenCalledWith(false)
  })
})
