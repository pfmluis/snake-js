export default function buildMakeMap (makeCell) {
  return function({ x, y }) {
    const cellsVector = []

    if (!x) {
      throw new Error('Map width was not provided')
    }

    if (!y) {
      throw new Error('Map height was not provided')
    }

    for (let yy = 0; yy < y; yy++) {
      for(let xx = 0; xx < x; xx++) {
        cellsVector.push(makeCell({ xx, yy }))
      }
    }

    return Object.freeze({
      getWidth: () => x,
      getHeight: () => y,
      getCellsVector: () => cellsVector,
    })
  }
}