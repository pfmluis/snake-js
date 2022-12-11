import buildMakeCell from '../entities/cell'
import buildMakeMap from '../entities/map'
import buildMakeNode from '../entities/node'
import buildMakeSnake from '../entities/snake'
import buildMakeApple from '../entities/apple'
import initializeMap from './initialize-map'

describe('Initialize Map', () => {
  const makeMap = () => {
    const buildMap = buildMakeMap(buildMakeCell())

    return buildMap({ x: 20, y: 20 })
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

    expect(map.getCellsVector().every(cell => cell.hasChanged)).toBe(true)
  })
})
