import { enemies, updateEnemy } from './enemy.js'
import { rocket, renderRocket, moveRocket } from './rocket.js'
import { bulletArray, gatling, moveBullet } from './gatling.js'
import { airfighter } from './player/Player.js'
import { moveBackground } from './background.js'
import { levelOverIfLastEnemyOut } from './gameOver.js'

export const fps = 60
export const gameState = {
  isGamePaused: false,
  gameIntervalId: undefined,
}

export function Step() {
  enemies.forEach(updateEnemy)
  bulletArray.forEach(moveBullet)
  moveRocket()
  changeAmmo()
  moveBackground(airfighter)

  renderRocket()
  airfighter.render()

  const lastEnemy = enemies[enemies.length - 1]
  levelOverIfLastEnemyOut(lastEnemy, gameState)
}

function changeAmmo() {
  ammoElement.innerHTML = `<img class="ammoImg" src="img/ammo-gatling-img.gif"> ${gatling.ammo} <br> <img class="ammoImg" src="img/ammo-rocket-img.gif"> ${rocket.ammo}`
}
