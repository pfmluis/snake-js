import buildMakeCell from '../entities/cell'
import buildMakeMap from '../entities/map'
import buildMakeNode from '../entities/node'
import buildMakeSnake from '../entities/snake'
import buildMakeApple from '../entities/apple'
import initializeMap from './initialize-map'

describe('Initialize Map', () => {
  const makeMap = () => {
    const buildMap = buildMakeMap(buildMakeCell())

    return buildMap({ width: 20, height: 20 })
  }

  const makeSnake = () => {
    const buildSnake = buildMakeSnake(buildMakeNode())

    return buildSnake({ 
      initialSize: 4,
      initialHeadPosition: {
        x: 6,
        y: 10,
      }
    })
  }

  const makeApple = () => {
    const buildApple = buildMakeApple()

    return buildApple()
  }

  it('should initialize all of maps cells as changed', () => {
    const map = makeMap()
    const snake = makeSnake()
    const apple = makeApple()

    initializeMap({ map, snake, apple })

    expect(
      map.getCells()
        .every(row => row
          .every(cell => cell.hasChanged)
        )
    ).toBe(true)
  })

  it('should initialize snake cells', () => {
    const map = makeMap()
    const snake = makeSnake()
    const apple = makeApple()

    initializeMap({ map, snake, apple })

    expect(map.getCells()[6][10].hasSnake()).toBe(true)
    expect(map.getCells()[5][10].hasSnake()).toBe(true)
    expect(map.getCells()[4][10].hasSnake()).toBe(true)
    expect(map.getCells()[3][10].hasSnake()).toBe(true)

    expect(map.getCellsVector()
      .filter(cell => !cell.hasSnake()).length
    ).toBe(map.getWidth() * map.getHeight() - snake.getSize()) // 20 by 20 map, minus snake size
  })

  it('should place apple', () => {
    const map = makeMap()
    const snake = makeSnake()
    const apple = makeApple()

    initializeMap({ map, snake, apple })

    expect(map.getCellsVector().filter(cell => cell.hasApple()).length).toBeTruthy()
  })
})
