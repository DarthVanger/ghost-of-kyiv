import { enemies, updateEnemy } from './enemy.js'
import { rockets, renderRocket, moveRocket } from './rocket.js'
import { bulletArray, moveBullet } from './gatling.js'
import { airfighter } from './player/Player.js'
import { moveBackground } from './background.js'
import { levelOverIfLastEnemyOut } from './gameOver.js'
import { renderAmmo } from './ammo.js'

export const fps = 60
export const gameState = {
  isGamePaused: false,
  gameIntervalId: undefined,
}

export function Step() {
  enemies.forEach(updateEnemy)
  bulletArray.forEach(moveBullet)
  rockets.forEach(moveRocket)
  rockets.forEach(renderRocket)

  renderAmmo()
  moveBackground(airfighter)
  airfighter.render()

  const lastEnemy = enemies[enemies.length - 1]
  levelOverIfLastEnemyOut(lastEnemy, gameState)
}