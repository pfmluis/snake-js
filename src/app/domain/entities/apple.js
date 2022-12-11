export default function buildMakeApple() {
  return function() {
    let x, y;

    return Object.freeze({
      getX: () => x,
      getY: () => y,
      placeApple: (cells) => {
        const randomIndex = Math.floor(Math.random() * (cells.length));

        x = cells[randomIndex].getX()
        y = cells[randomIndex].getY()
      }
    })
  }
}