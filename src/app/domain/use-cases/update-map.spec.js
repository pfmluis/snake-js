import buildMakeCell from '../entities/cell'
import updateMap from './update-map'

const makeNode = (x, y) => ({
    getX: () => x,
    getY: () => y
})

const makeMapStub = () => {
  const makeCell = buildMakeCell()
  const cells = [
    [makeCell({x: 0, y: 0 }), makeCell({x: 1, y: 0 })],
    [makeCell({x: 0, y: 1 }), makeCell({x: 1, y: 1 })],
    [makeCell({x: 0, y: 2 }), makeCell({x: 1, y: 2 })],
  ]

  return {
    getCells: () => cells,
    getCellsVector: () => cells.flat(),
  }
}

const makeSnakeStub = () => ({
  'getHead': () => makeNode(3, 0),
  'move': () => undefined,
  'isBitting': () => false,
  'grow': () => undefined,
})

const makeAppleStub = () => ({
  getX: () => 0,
  getY: () => 0,
  removeApple: () => undefined,
  placeApple: () => undefined
})

const makeSut = () => {
  const mapStub = makeMapStub()
  const snakeStub = makeSnakeStub()
  const appleStub = makeAppleStub()

  return {
    snakeStub,
    mapStub,
    appleStub
  }
}

describe('Update Map', () => {
  it('should call snake to move', () => {
    const { mapStub, snakeStub, appleStub } = makeSut()
    const snakeMoveSpy = jest.spyOn(snakeStub, 'move')

    updateMap({ map: mapStub, snake: snakeStub, apple: appleStub})

    expect(snakeMoveSpy).toHaveBeenCalled()
  })

  it('should not grow in case apple was not eaten', () => {
    const { mapStub, snakeStub, appleStub } = makeSut()
    const snakeGrowSpy = jest.spyOn(snakeStub, 'grow')
    jest.spyOn(snakeStub, 'isBitting').mockImplementationOnce(() => false)

    updateMap({ map: mapStub, snake: snakeStub, apple: appleStub})

    expect(snakeGrowSpy).not.toHaveBeenCalled()
  })

  it('should grow in case apple was eaten', () => {
    const { mapStub, snakeStub, appleStub } = makeSut()
    const snakeGrowSpy = jest.spyOn(snakeStub, 'grow')
    jest.spyOn(snakeStub, 'isBitting').mockImplementationOnce(() => true)

    updateMap({ map: mapStub, snake: snakeStub, apple: appleStub})

    expect(snakeGrowSpy).toHaveBeenCalled()
  })

  it('should not remove apple unless it was eaten', () => {
    const { mapStub, snakeStub, appleStub } = makeSut()
    const appleRemoveSpy = jest.spyOn(appleStub, 'removeApple')
    jest.spyOn(snakeStub, 'isBitting').mockImplementationOnce(() => false)

    updateMap({ map: mapStub, snake: snakeStub, apple: appleStub})

    expect(appleRemoveSpy).not.toHaveBeenCalled()
  })

  it('should remove apple in case it was eaten', () => {
    const { mapStub, snakeStub, appleStub } = makeSut()
    const appleRemoveSpy = jest.spyOn(appleStub, 'removeApple')
    jest.spyOn(snakeStub, 'isBitting').mockImplementationOnce(() => true)

    updateMap({ map: mapStub, snake: snakeStub, apple: appleStub})

    expect(appleRemoveSpy).toHaveBeenCalled()
  })


  it('should not place apple unless it was eaten', () => {
    const { mapStub, snakeStub, appleStub } = makeSut()
    const applePlaceSpy = jest.spyOn(appleStub, 'placeApple')
    jest.spyOn(snakeStub, 'isBitting').mockImplementationOnce(() => false)

    updateMap({ map: mapStub, snake: snakeStub, apple: appleStub})

    expect(applePlaceSpy).not.toHaveBeenCalled()
  })

  it('should remove apple in case it was eaten', () => {
    const { mapStub, snakeStub, appleStub } = makeSut()
    const applePlaceSpy = jest.spyOn(appleStub, 'placeApple')
    jest.spyOn(snakeStub, 'isBitting').mockImplementationOnce(() => true)

    updateMap({ map: mapStub, snake: snakeStub, apple: appleStub})

    expect(applePlaceSpy).toHaveBeenCalled()
  })
});