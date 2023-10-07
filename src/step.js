import { enemies, updateEnemy } from './enemy.js'
import { renderRocket, moveRocket } from './rocket.js'
import { bulletArray, moveBullet } from './gatling.js'
import { airfighter } from './player/Player.js'
import { moveBackground } from './background.js'
import { levelOverIfLastEnemyOut } from './gameOver.js'
import { renderAmmo } from './ammo.js'
import { isMobileDevice } from './mobileJoystick.js'
import { setAirfighterVelocityFromMobileJoystick } from './mobile/changeMobileSpeed.js'

export const fps = 60
export const gameState = {
  isGamePaused: false,
  gameIntervalId: undefined,
}

export function Step() {
  enemies.forEach(updateEnemy)
  bulletArray.forEach(moveBullet)
  moveRocket()
  renderAmmo()
  moveBackground(airfighter)

  renderRocket()
  airfighter.render()

  if (isMobileDevice.isShown) {
    setAirfighterVelocityFromMobileJoystick(airfighter, isMobileDevice)
  }

  const lastEnemy = enemies[enemies.length - 1]
  levelOverIfLastEnemyOut(lastEnemy, gameState)
}
