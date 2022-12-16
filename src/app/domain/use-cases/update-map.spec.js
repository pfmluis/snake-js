import updateMap from './update-map'

const makeMapStub = () => {
  return {}
}

const makeSnakeStub = () => {
  return {
    'move': () => undefined,
  }
}

const makeAppleStub = () => {
  return {}
}

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
});