export default function buildMakeMap (makeCell) {
  return function({ x, y }) {
    const cells = []

    if (!x) {
      throw new Error('Map width was not provided')
    }

    if (!y) {
      throw new Error('Map height was not provided')
    }

    for (let xx = 0; xx < x; xx++) {
      for(let yy = 0; yy < y; yy++) {
        cells.push(makeCell({ xx, yy }))
      }
    }

    return Object.freeze({
      getWidth: () => x,
      getHeight: () => y,
      getCells: () => cells,
    })
  }
}