import { gameState } from '../gameState.js'
import { createRocket } from './enemyRocketAtack.js'

export function createTargetedRocket(enemy) {
  const rocket = createRocket(enemy)
  const playerCenter = {
    x: gameState.airfighter.x + gameState.airfighter.width / 2,
    y: gameState.airfighter.y + gameState.airfighter.height / 2,
  }
  const distX = playerCenter.x - enemy.x
  const distY = playerCenter.y - enemy.y
  const dist = Math.sqrt(distX * distX + distY * distY)
  rocket.vx = (8 * distX) / dist
  rocket.vy = (8 * distY) / dist

  rocket.rotationX = Math.atan2(distY, distX)
  rocket.element.style.transform = `rotate(${rocket.rotationX}rad)`

  return rocket
}
