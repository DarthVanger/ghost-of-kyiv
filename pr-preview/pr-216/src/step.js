import { enemies, updateEnemy } from './enemy.js'
import { renderRocket, moveRocket, deleteUselessEnemyRockets } from './rocket.js'
import { bulletArray, moveBullet } from './gatling.js'
import { moveBackground } from './background.js'
import { levelOverIfLastEnemyOut } from './gameOver.js'
import { renderAmmo } from './ammo.js'
import { mobileJoystick } from './mobileJoystick.js'
import { setAirfighterVelocityFromMobileJoystick, mobilePauseGame } from './mobile/mobileVelocityController.js'
import { gameState } from './gameState.js'
export const fps = 60

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
    mobilePauseGame(gameState)
  }

  const lastEnemy = enemies[enemies.length - 1]
  levelOverIfLastEnemyOut(lastEnemy, gameState)
  if (!gameState.isGamePaused) {
    requestAnimationFrame(Step)
  }
  deleteUselessEnemyRockets() 
}

document.querySelector('.mobile-pause').addEventListener('click', () => {
  gameState.isGamePaused = !gameState.isGamePaused
  if (!gameState.isGamePaused) {
    document.querySelector('#pause-screen').style.display = 'none'
    requestAnimationFrame(Step)
  } else {
    document.querySelector('#pause-screen').style.display = 'block'
  }
});