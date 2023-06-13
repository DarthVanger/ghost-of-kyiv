import { enemies, updateEnemy } from './enemy.js'
import { rocket, renderRocket, moveRocket } from './rocket.js'
import { bulletArray, gatling, moveBullet } from './gatling.js'
import { airfighter } from './player/Player.js'
import { soundMainTheme, soundLevelComplete } from './music.js'
import { moveBackground } from './background.js'
import { levelCompleteScreen } from './levelCompleteScreen.js'

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
  const vuletivZaRamku = lastEnemy.x < 0 - lastEnemy.width
  if (vuletivZaRamku) {
    stopInterval()
    document.body.append(levelCompleteScreen)
    fadeIn(levelCompleteScreen)
    soundMainTheme.pause()
    soundMainTheme.currentTime = 0
    soundLevelComplete.play()
  }
}

function changeAmmo() {
  ammoElement.innerHTML = `<img class="ammoImg" src="img/ammo-gatling-img.gif"> ${gatling.ammo} <br> <img class="ammoImg" src="img/ammo-rocket-img.gif"> ${rocket.ammo}`
}

function fadeIn(element) {
  element.className = 'fadeIn'
}

export function stopInterval() {
  clearInterval(gameState.gameIntervalId)
  gameState.isGamePaused = true
}
