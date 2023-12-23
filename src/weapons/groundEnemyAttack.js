import { gameState } from '../gameState.js'
import { createRocket } from './enemyRocketAtack.js'

export function createTargetedRocket(enemy) {
  const rocket = createRocket(enemy)
  const playerCenter = {
    x: gameState.airfighter.x - gameState.airfighter.width / 2,
    y: gameState.airfighter.y - gameState.airfighter.height / 2,
  }
  const distX = playerCenter.x - enemy.x
  const distY = playerCenter.y - enemy.y
  const dist = Math.sqrt(distX * distX + distY * distY)
  rocket.vx = (5 * distX) / dist
  rocket.vy = (5 * distY) / dist
  return rocket
}
