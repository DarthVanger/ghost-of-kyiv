import { frontBgY } from '../background.js'

export function isOutOfScreen(gameObject) {
  const gameWidth = window.innerWidth

  // ground enemies are below the browser window...
  const gameHeight = window.innerHeight + frontBgY + 100

  return (
    gameObject.x + gameObject.width < 0 ||
    gameObject.y + gameObject.height < 0 ||
    gameObject.x > gameWidth ||
    gameObject.y > gameHeight
  )
}
