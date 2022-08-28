export default function buildMakeCell() {
  return function({ x, y }) {
    return Object.freeze({
      getX: () => x,
      getY: () => y,
    })
  }
}