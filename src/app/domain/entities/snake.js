export default function buildMakeSnake(makeNode) {
  return function makeSnake({ initialSize, initialHeadPosition }) {
    let directionX = 1, directionY = 0
    let nodes = []

    validatePositionObject(initialHeadPosition)
    initialize()

    function validatePositionObject(position) {
      if (!Object.keys(position).includes('x') || !Object.keys(position).includes('y'))
        throw new Error('Position object must have an x and a y')
    }

    function initialize() {
      for (let i = 0; i < initialSize; i++) {
        const [x, y] = [initialHeadPosition.x - i, initialHeadPosition.y]
        nodes.push(makeNode({ x, y }))
      }
    }

    return Object.freeze({
      getSize: () => nodes.length,
      grow: () => {
        const tail = nodes[nodes.length - 1]
        nodes.push({ ...tail })
      },
      getDirection: () => ({ x: directionX, y: directionY}),
      getNodes: () => nodes,
      lookUp: () => {
        if (directionY == 1) return

        directionX = 0
        directionY = -1
      },
      lookDown: () => {
        if (directionY == -1) return

        directionX = 0
        directionY = 1
      },
      lookLeft: () => {
        if (directionX == 1) return
        
        directionY = 0
        directionX = -1
      },
      lookRight: () => {
        if (directionX == -1) return
        
        directionY = 0
        directionX = 1
      },
      move: () => {
        const headNode = nodes[0]
        nodes.unshift(makeNode({
          x: headNode.getX() + directionX,
          y: headNode.getY() + directionY,
        }))

        nodes.pop()
      }
    })
  }
}