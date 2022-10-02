import buildMakeMap from './map';

const buildMakeCellStub = () => {
  return jest.fn()
}

const makeSut = () => {
  const makeCellStub = buildMakeCellStub()
  const makeMap = buildMakeMap(makeCellStub)

  return {
    makeMap,
    makeCellStub
  }
}

describe('Map', () => {
  it('should create a map with an x by y size', () => {
    const { makeMap } = makeSut()
    const map = makeMap({ x: 20, y: 20 })

    expect(map.getHeight()).toBe(20)
    expect(map.getWidth()).toBe(20)
  });

  it('should throw if x is not provided', () => {
    const { makeMap } = makeSut()

    expect(() => makeMap({ y: 20 })).toThrow(new Error('Map width was not provided'))
  })

  it('should throw if y is not provided', () => {
    const { makeMap } = makeSut()

    expect(() => makeMap({ x: 20 })).toThrow(new Error('Map height was not provided'))
  })

  it('should call makeCell x * y times', () => {
    const { makeMap, makeCellStub } = makeSut()

    makeMap({ x: 20,  y: 20})
    expect(makeCellStub.mock.calls.length).toBe(400)
  })

  it('should populate cells', () => {
    const { makeMap } = makeSut()

    const map = makeMap({ x: 5, y: 5})
    expect(map.getCells().length).toBe(25)
  })
});