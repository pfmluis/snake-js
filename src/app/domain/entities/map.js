export default function buildMakeMap (makeCell) {
  return function({ x, y }) {
    const cells = []
    const cellsVector = []

    if (!x) {
      throw new Error('Map width was not provided')
    }

    if (!y) {
      throw new Error('Map height was not provided')
    }

    for (let yy = 0; yy < y; yy++) {
      cells[yy] = []
      for(let xx = 0; xx < x; xx++) {
        const cell = makeCell({ xx, yy })
        cells[yy].push(cell)
        cellsVector.push(cell)
      }
    }

    return Object.freeze({
      getWidth: () => x,
      getHeight: () => y,
      getCells: () => cells,
      getCellsVector: () => cellsVector,
    })
  }
}