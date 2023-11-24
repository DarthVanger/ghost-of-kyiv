import { enemies, updateEnemy } from './enemy.js'
import { renderRocket, moveRocket } from './rocket.js'
import { bulletArray, moveBullet } from './gatling.js'
import { moveBackground } from './background.js'
import { levelOverIfLastEnemyOut } from './gameOver.js'
import { renderAmmo } from './ammo.js'
import { mobileJoystick } from './mobileJoystick.js'
import { setAirfighterVelocityFromMobileJoystick } from './mobile/mobileVelocityController.js'
import { gameState } from './gameState.js'
export const fps = 60


gameState.isGamePaused = false;
gameState.gameIntervalId = undefined;

export function Step() {
  const airfighter = gameState.airfighter

  enemies.forEach(updateEnemy)
  bulletArray.forEach(moveBullet)
  moveRocket()
  renderAmmo()
  moveBackground(airfighter)

  renderRocket()
  airfighter.render()

  if (mobileJoystick.isMobileDevice) {
    setAirfighterVelocityFromMobileJoystick(airfighter, mobileJoystick)
  }

  const lastEnemy = enemies[enemies.length - 1]
  levelOverIfLastEnemyOut(lastEnemy, gameState)
}
