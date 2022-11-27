export default function buildMakeCell() {
  return function({ x, y }) {
    let hasApple = false
    let hasSnake = false

    return Object.freeze({
      getX: () => x,
      getY: () => y,
      hasApple: () => hasApple,
      setHasApple: (a) => { hasApple = a },
      hasSnake: () => hasSnake,
      setHasSnake: (s) => { hasSnake = s },
    })
  }
}