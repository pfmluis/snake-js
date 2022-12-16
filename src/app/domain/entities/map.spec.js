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
    const map = makeMap({ width: 20, height: 20 })

    expect(map.getHeight()).toBe(20)
    expect(map.getWidth()).toBe(20)
  });

  it('should throw if x is not provided', () => {
    const { makeMap } = makeSut()

    expect(() => makeMap({ height: 20 })).toThrow(new Error('Map width was not provided'))
  })

  it('should throw if y is not provided', () => {
    const { makeMap } = makeSut()

    expect(() => makeMap({ width: 20 })).toThrow(new Error('Map height was not provided'))
  })

  it('should call makeCell x * y times', () => {
    const { makeMap, makeCellStub } = makeSut()

    makeMap({ width: 20,  height: 20 })
    expect(makeCellStub.mock.calls.length).toBe(400)
  })

  it('should populate cells', () => {
    const { makeMap } = makeSut()

    const map = makeMap({ width: 5, height: 5 })
    expect(map.getCells().length).toBe(5)
    expect(map.getCells()[0].length).toBe(5)
    expect(map.getCells()[4].length).toBe(5)
  })
});