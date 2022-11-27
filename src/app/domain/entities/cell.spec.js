import buildMakeCell from './cell';

describe('Cell', () => {
  const makeCell = buildMakeCell()

  it('should be able to getX', () => {
    const sut = makeCell({ x: 1, y: 2 })

    expect(sut.getX()).toBe(1)
  });

  it('should be able to getY', () => {
    const sut = makeCell({ x: 1, y: 2 })

    expect(sut.getY()).toBe(2)
  });

  it('should create a cell without an apple', () => {
    const sut = makeCell({ x: 1, y: 2 })

    expect(sut.hasApple()).toBe(false)
  })

  it('should allow cell to spawn an apple', () => {
    const sut = makeCell({ x: 1, y: 2 })

    sut.setHasApple(true)
    expect(sut.hasApple()).toBe(true)
  })

  it('should create a cell without a snake', () => {
    const sut = makeCell({ x: 1, y: 2 })

    expect(sut.hasSnake()).toBe(false)
  })

  it('should allow cell to have a snake', () => {
    const sut = makeCell({ x: 1, y: 2 })

    sut.setHasSnake(true)
    expect(sut.hasSnake()).toBe(true)
  })
})
