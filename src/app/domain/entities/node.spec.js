import buildMakeNode from './node';

describe('Snake Node', () => {
  const makeNode = buildMakeNode()

  it('should create a node with correct coordinates', () => {
    const sut = makeNode({ x: 1, y: 2 })

    expect(sut.getX()).toBe(1)
    expect(sut.getY()).toBe(2)
  });

  it('should not create a node with negative x', () => {
    expect(() => makeNode({ x: -1, y: 3})).toThrow()
  })

  it('should not create a node with negative y', () => {
    expect(() => makeNode({ x: 3, y: -3})).toThrow()
  })

  it('should set the node position correctly', () => {
    const sut = makeNode({ x: 0, y: 0 })
    sut.setPosition(1, 2)

    expect(sut.getX()).toBe(1)
    expect(sut.getY()).toBe(2)
  })

  it('should not allow to set negative x coordinates', () => {
    const sut = makeNode({ x: 0, y: 0 })

    expect(() => sut.setPosition(-1, 2)).toThrow()
  })
  
  it('should not allow to set negative y coordinates', () => {
    const sut = makeNode({ x: 0, y: 0 })

    expect(() => sut.setPosition(1, -2)).toThrow()
  })

})
