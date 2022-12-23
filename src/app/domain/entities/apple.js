export default function buildMakeApple() {
  return function() {
    let x, y;

    return Object.freeze({
      getX: () => x,
      getY: () => y,
      removeApple: (cells) => {
        const appleCell = cells[x][y]
        appleCell.setHasApple(false)
        appleCell.setHasChanged(true)
      },
      placeApple: (cellsVector) => {
        const randomIndex = Math.floor(Math.random() * (cellsVector.length));
        const cell = cellsVector[randomIndex]
        cell.setHasApple(true)
        cell.setHasChanged(true)
        x = cell.getX()
        y = cell.getY()
      }
    })
  }
}