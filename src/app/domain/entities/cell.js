export default function buildMakeCell() {
  return function({ x, y }) {
    let hasApple = false
    let hasSnake = false
    let hasChanged = true

    return Object.freeze({
      getX: () => x,
      getY: () => y,
      hasApple: () => hasApple,
      setHasApple: (a) => { hasApple = Boolean(a) },
      hasSnake: () => hasSnake,
      setHasSnake: (s) => { hasSnake = Boolean(s) },
      hasChanged: () => hasChanged,
      setHasChanged: (hc) => hasChanged = Boolean(hc),
    })
  }
}