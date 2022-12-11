export default function initializeMap({ map, snake, apple }) {  
  snake.getNodes().forEach(node => {
    const x = node.getX()
    const y = node.getY()
    map.getCells()[x][y].setHasSnake(true)
  })

  apple.placeApple(map.getCellsVector())
}