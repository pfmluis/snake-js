export default function buildMakeSnake(makeNode) {
  return function makeSnake({ initialSize, initialHeadPosition }) {
    let vx = 1, vy = 0
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
      getDirection: () => ({ x: vx, y: vy}),
      getHead: () => nodes[0],
      getNodes: () => nodes,
      lookUp: () => {
        if (vy == 1) return

        vx = 0
        vy = -1
      },
      lookDown: () => {
        if (vy == -1) return

        vx = 0
        vy = 1
      },
      lookLeft: () => {
        if (vx == 1) return
        
        vy = 0
        vx = -1
      },
      lookRight: () => {
        if (vx == -1) return
        
        vy = 0
        vx = 1
      },
      move: () => {
        const headNode = nodes[0]
        nodes.unshift(makeNode({
          x: headNode.getX() + vx,
          y: headNode.getY() + vy,
        }))

        nodes.pop()
      },
      isBittingSelf: () => {
        const [ head, ...body ] = nodes

        return body
          .some(node => node.getX() === head.getX() && node.getY() === head.getY())
      }
    })
  }
}