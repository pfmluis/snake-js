export default function updateMap({ map, snake, apple }) {
  snake.move()

  if (snake.isBitting(apple)) {
    snake.grow()
    apple.removeApple(map.getCells())
    apple.placeApple(map.getCellsVector())
  }
}