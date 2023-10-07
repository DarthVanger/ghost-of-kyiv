import { enemies, updateEnemy } from './enemy.js'
import { renderRocket, moveRocket } from './rocket.js'
import { bulletArray, moveBullet } from './gatling.js'
import { airfighter } from './player/Player.js'
import { moveBackground } from './background.js'
import { levelOverIfLastEnemyOut } from './gameOver.js'
import { renderAmmo } from './ammo.js'
import { mobileVelocity } from './mobileJoystick.js'

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

  if(mobileVelocity.createdJoystick) {
    mobileTrafficControl()
  }

  const lastEnemy = enemies[enemies.length - 1]
  levelOverIfLastEnemyOut(lastEnemy, gameState)
}

function mobileTrafficControl() {
  if(mobileVelocity.x < 0) {
    airfighter.isKeyLeftPressed = true
    airfighter.vx *= (mobileVelocity.x * -1)
  } else if(mobileVelocity.x > 0) {
    airfighter.isKeyRightPressed = true
    airfighter.vx *= mobileVelocity.x
  } else {
    airfighter.isKeyRightPressed = false
    airfighter.isKeyLeftPressed = false
  }

  if(mobileVelocity.y < 0) {
    airfighter.isKeyUpPressed = true
    airfighter.vy *= (mobileVelocity.y * -1)
  } else if(mobileVelocity.y > 0) {
    airfighter.isKeyDownPressed = true
    airfighter.vy *= mobileVelocity.y
  } else {
    airfighter.isKeyUpPressed = false
    airfighter.isKeyDownPressed = false
  }
}
