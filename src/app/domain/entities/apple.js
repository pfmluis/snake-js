export default function buildMakeApple() {
  return function() {
    let x, y;

    return Object.freeze({
      getX: () => x,
      getY: () => y,
      placeApple: (cells) => {
        const randomIndex = Math.floor(Math.random() * (cells.length));
        const cell = cells[randomIndex]
        cell.setHasApple(true)
        x = cell.getX()
        y = cell.getY()
      }
    })
  }
}