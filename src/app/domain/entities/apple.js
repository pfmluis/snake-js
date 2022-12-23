export default function buildMakeApple() {
  return function() {
    let x, y;

    return Object.freeze({
      getX: () => x,
      getY: () => y,
      removeApple: (cells) => {
        cells[x][y].setHasApple(false)
      },
      placeApple: (cellsVector) => {
        const randomIndex = Math.floor(Math.random() * (cellsVector.length));
        const cell = cellsVector[randomIndex]
        cell.setHasApple(true)
        x = cell.getX()
        y = cell.getY()
      }
    })
  }
}