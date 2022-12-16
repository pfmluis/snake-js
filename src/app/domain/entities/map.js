export default function buildMakeMap (makeCell) {
  return function({ width, height }) {
    const cells = []
    const cellsVector = []

    if (!width) {
      throw new Error('Map width was not provided')
    }

    if (!height) {
      throw new Error('Map height was not provided')
    }

    for (let y = 0; y < height; y++) {
      cells[y] = []
      for(let x = 0; x < width; x++) {
        const cell = makeCell({ x, y })
        cells[y].push(cell)
        cellsVector.push(cell)
      }
    }

    return Object.freeze({
      getWidth: () => width,
      getHeight: () => height,
      getCells: () => cells,
      getCellsVector: () => cellsVector,
    })
  }
}