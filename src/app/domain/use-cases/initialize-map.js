export default function initializeMap({ map, snake, apple }) {  
  for (const node of snake.getNodes()) {
    const x = node.getX()
    const y = node.getY()
    map.getCells()[x][y].setHasSnake(true)
  }

  apple.placeApple(map.getCellsVector())
}