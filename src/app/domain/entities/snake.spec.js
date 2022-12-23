import buildMakeSnake from './snake'
import buildMakeNode from './node'
import buildMakeCell from './cell';

describe('Snake', () => {
  const makeNode = buildMakeNode()
  const makeSnake = buildMakeSnake(makeNode)

  it('should create a snake', () => {
    const sut = makeSnake({ initialSize: 1, initialHeadPosition: { x: 2, y: 3 }})

    expect(sut.getSize()).toBe(1)
  });

  it('should not create a snake with an invalid initialHeadPosition - no x', () => {
    expect(() => makeSnake({ initialSize: 1, initialHeadPosition: { s: 2, y: 3 }})).toThrow()
  });

  it('should not create a snake with an invalid initialHeadPosition - no y', () => {
    expect(() => makeSnake({ initialSize: 1, initialHeadPosition: { x: 2, t: 3 }})).toThrow()
  });

  it('should grow', () => {
    const sut = makeSnake({ initialSize: 3, initialHeadPosition: { x: 5, y: 0 }})
    sut.grow()

    expect(sut.getSize()).toBe(4)
  })


  it('should add copy of tail at the end of nodes when growing', () => {
    const sut = makeSnake({ initialSize: 3, initialHeadPosition: { x: 5, y: 0 }})
    sut.grow()

    expect(sut.getNodes()[3].getX()).toBe(sut.getNodes()[2].getX())
    expect(sut.getNodes()[3].getY()).toBe(sut.getNodes()[2].getY())
  })

  it('should get direction', () => {
    const sut = makeSnake({ initialSize: 1, initialHeadPosition: { x: 0, y: 0 }})

    expect(sut.getDirection()).toEqual({ x: 1, y: 0 })
  })

  it('should set direction up', () => {
    const sut = makeSnake({ initialSize: 1, initialHeadPosition: { x: 0, y: 0 }})
    sut.lookUp()

    expect(sut.getDirection()).toEqual({ x: 0, y: -1})
  })

  it('should not set direction up when looking down', () => {
    const sut = makeSnake({ initialSize: 1, initialHeadPosition: { x: 0, y: 0 }})
    sut.lookDown()
    sut.lookUp()

    expect(sut.getDirection()).toEqual({ x: 0, y: 1 })
  })

  it('should set direction down', () => {
    const sut = makeSnake({ initialSize: 1, initialHeadPosition: { x: 0, y: 0 }})
    sut.lookDown()

    expect(sut.getDirection()).toEqual({ x: 0, y: 1 })
  })

  it('should not set direction down when looking up', () => {
    const sut = makeSnake({ initialSize: 1, initialHeadPosition: { x: 0, y: 0 }})
    sut.lookUp()
    sut.lookDown()

    expect(sut.getDirection()).toEqual({ x: 0, y: -1 })
  })

  it('should set direction left', () => {
    const sut = makeSnake({ initialSize: 1, initialHeadPosition: { x: 0, y: 0 }})
    sut.lookDown()
    sut.lookLeft()

    expect(sut.getDirection()).toEqual({ x: -1, y: 0})
  });

  it('should not set direction left when looking right', () => {
    const sut = makeSnake({ initialSize: 1, initialHeadPosition: { x: 0, y: 0 }})
    sut.lookRight()
    sut.lookLeft()

    expect(sut.getDirection()).toEqual({ x: 1, y: 0})
  });

  it('should set direction right', () => {
    const sut = makeSnake({ initialSize: 1, initialHeadPosition: { x: 0, y: 0 }})
    sut.lookRight()

    expect(sut.getDirection()).toEqual({ x: 1, y: 0})
  });

  it('should not set direction right when looking left', () => {
    const sut = makeSnake({ initialSize: 1, initialHeadPosition: { x: 0, y: 0 }})
    sut.lookDown()
    sut.lookLeft()
    sut.lookRight()

    expect(sut.getDirection()).toEqual({ x: -1, y: 0})
  });

  it('should initialize nodes with provided initialSize', () => {
    const sut = makeSnake({ initialSize: 3, initialHeadPosition: { x: 5, y: 0 }})

    expect(sut.getNodes().length).toBe(3)
  });

  it('should initialize nodes in correct positions', () => {
    const sut = makeSnake({ initialSize: 3, initialHeadPosition: { x: 5, y: 0 }})

    expect(sut.getNodes()[0].getX()).toBe(5)
    expect(sut.getNodes()[0].getY()).toBe(0)
    
    expect(sut.getNodes()[1].getX()).toBe(4)
    expect(sut.getNodes()[1].getY()).toBe(0)

    expect(sut.getNodes()[2].getX()).toBe(3)
    expect(sut.getNodes()[2].getY()).toBe(0)
  });

  it('should move to right when looking right', () => {
    const sut = makeSnake({ initialSize: 3, initialHeadPosition: { x: 5, y: 0 }})

    sut.move()
    expect(sut.getNodes()[0].getX()).toBe(6)
    expect(sut.getNodes()[0].getY()).toBe(0)

    expect(sut.getNodes()[1].getX()).toBe(5)
    expect(sut.getNodes()[1].getY()).toBe(0)

    expect(sut.getNodes()[2].getX()).toBe(4)
    expect(sut.getNodes()[2].getY()).toBe(0)

    expect(sut.getSize()).toBe(3)
  })

  it('should know if it is biting self', () => {
    const sut = makeSnake({ initialSize: 5, initialHeadPosition: { x: 7, y: 0 }})

    expect(sut.isBittingSelf()).toBe(false)
  })

  it('should be able to bite self', () => {
    const sut = makeSnake({ initialSize: 5, initialHeadPosition: { x: 7, y: 0 }})

    // Complete circle to bite self
    sut.lookDown()
    sut.move()

    sut.lookLeft()
    sut.move()

    sut.lookUp()
    sut.move()

    expect(sut.isBittingSelf()).toBe(true)
  })

  it('should get snake head', () => {
    const sut = makeSnake({ initialSize: 3, initialHeadPosition: { x: 5, y: 0 }})

    const snakeHead = sut.getHead()
    expect(snakeHead.getX()).toBe(5)
    expect(snakeHead.getY()).toBe(0)
  })

  it(`should return true if snake's head intercepts the given cell`, () => {
    const sut = makeSnake({ initialSize: 3, initialHeadPosition: { x: 5, y: 0 }})
    const makeCell = buildMakeCell()

    const result = sut.isBitting(makeCell({ x: 5, y: 0}))
    expect(result).toBe(true)
  })

  it(`should return false if snake's head does not intercept the given cell`, () => {
    const sut = makeSnake({ initialSize: 3, initialHeadPosition: { x: 5, y: 0 }})
    const makeCell = buildMakeCell()

    const result = sut.isBitting(makeCell({ x: 0, y: 0}))
    expect(result).toBe(false)
  })
});