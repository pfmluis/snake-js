export default function buildMakeSnake() {
  return function makeSnake({ size, headStartingPosition }) {
    let directionX = 0, directionY = 0

    validatePositionObject(headStartingPosition)

    function validatePositionObject(position) {
      if (!Object.keys(position).includes('x') || !Object.keys(position).includes('y'))
        throw new Error('Position object must have an x and a y')
    }

    return Object.freeze({
      getSize: () => size,
      grow: () => size++,
      getDirection: () => ({ x: directionX, y: directionY})
    })
  }
}