import buildMakeSnake from './snake';

describe('Snake', () => {
  const makeSnake = buildMakeSnake()

  it('should create a snake', () => {
    const sut = makeSnake({ size: 1, headStartingPosition: { x: 2, y: 3 }})

    expect(sut.getSize()).toBe(1)
  });

  it('should not create a snake with an invalid headStartingPosition - no x', () => {
    expect(() => makeSnake({ size: 1, headStartingPosition: { s: 2, y: 3 }})).toThrow()
  });

  it('should not create a snake with an invalid headStartingPosition - no y', () => {
    expect(() => makeSnake({ size: 1, headStartingPosition: { x: 2, t: 3 }})).toThrow()
  });

  it('should grow', () => {
    const sut = makeSnake({ size: 1, headStartingPosition: { x: 0, y: 0 }})
    sut.grow()

    expect(sut.getSize()).toBe(2)
  })

  it('should get direction', () => {
    const sut = makeSnake({ size: 1, headStartingPosition: { x: 0, y: 0 }})

    expect(sut.getDirection()).toEqual({x: 0, y: 0})
  })
});