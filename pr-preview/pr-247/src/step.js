import { renderCurrentScore } from './scores/currentGameScore.js'
import { handleCollisions } from './collisions/collisions.js'
import { updateEnemy } from './enemy/enemy.js'
import {
  renderRocket,
  moveRocket,
  deleteUselessEnemyRockets,
} from './weapons/rocket.js'
import { bulletArray, moveBullet } from './weapons/gatling.js'
import { moveBackground } from './background.js'
import { levelOverIfLastEnemyOut, gameOver } from './gameOver.js'
import { renderAmmo } from './ammo.js'
import { mobileJoystick } from './mobileJoystick.js'
import { setAirfighterVelocityFromMobileJoystick } from './mobile/mobileVelocityController.js'
import { gameState } from './gameState.js'

export const fps = 60

export function Step() {
  renderCurrentScore()
  const airfighter = gameState.airfighter

  gameState.enemies.forEach(updateEnemy)
  bulletArray.forEach(moveBullet)
  moveRocket()
  renderAmmo()
  moveBackground(airfighter)

  renderRocket()
  airfighter.render()

  if (mobileJoystick.isMobileDevice) {
    setAirfighterVelocityFromMobileJoystick(airfighter, mobileJoystick)
  }

  const lastEnemy = gameState.enemies[gameState.enemies.length - 1]
  levelOverIfLastEnemyOut(lastEnemy, gameState)
  if (!gameState.isGamePaused) {
    requestAnimationFrame(Step)
  }
  deleteUselessEnemyRockets()
  gameState.playerFlares.forEach((flare) => {
    flare.render()
  })
  handleCollisions()
  playerDiesIfHpBelowZiro()
}

function playerDiesIfHpBelowZiro() {
  if (gameState.airfighter.health.element.value <= 0) {
    gameOver()
  }
}
