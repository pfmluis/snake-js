export default function buildMakeNode() {
  return function makeNode({ x, y }) {
    validatePosition(x, y)

    function validatePosition(x, y) {
      if (x < 0 || y < 0) throw new Error(`None of the node's axis can be lesser than 0`)
    }

    return Object.freeze({
      getX: () => x,
      getY: () => y,
      setPosition: (_x, _y) => {
        validatePosition(_x, _y)

        x = _x
        y = _y
      }
    })
  }
}