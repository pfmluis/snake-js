export default function buildMakeApple() {
  return function() {
    return Object.freeze({
      placeApple: (cells) => {
        const randomIndex = Math.floor(Math.random() * (cells.length));
        cells[randomIndex].setHasApple(true)
      }
    })
  }
}