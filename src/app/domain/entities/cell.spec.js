import buildMakeCell from './cell';

describe('Cell', () => {
  const makeCell = buildMakeCell()

  it('should be able to getX', () => {
    const sut = makeCell({ x: 1, y: 2})

    expect(sut.getX()).toBe(1)
  });

  it('should be able to getY', () => {
    const sut = makeCell({ x: 1, y: 2})

    expect(sut.getY()).toBe(2)
  });
})
