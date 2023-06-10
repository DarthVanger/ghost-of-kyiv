import { enemies, renderEnemy } from './enemy.js'
import { rocket, renderRocket, moveRocket } from './rocket.js'
import { bulletArray, gatling, moveBullet } from './gatling.js'
import { airfighter } from './player/Player.js'
import { soundMainTheme, soundLevelComplete } from './music.js'
import { rocketDefaultX, rocketDefaultY } from './rendering/Helpers.js'
import performCollisionChecksForEnemy, {
  checkEnemyShipCollision,
  enemyCollisionWithBullet,
} from './rendering/EnemyCollisionsChecks.js'
import { moveBackground } from './background.js'
import { levelCompleteScreen } from './levelCompleteScreen.js'

export const fps = 60
export const gameState = {
  isGamePaused: false,
  gameIntervalId: undefined,
}

export function Step() {
  enemies.forEach((enemy) => {
    if (enemy.behavior) {
      enemy.behavior()
    }
  })

  enemies.forEach(renderEnemy)
  enemies.forEach(renderEnemyRocket)
  enemies.forEach(moveEnemy)
  enemies.forEach(moveEnemyRocket)
  bulletArray.forEach(moveBullet)
  moveRocket()
  changeAmmo()
  enemies.forEach(checkEnemyShipCollision)
  enemies.forEach(performCollisionChecksForEnemy)
  enemies.forEach(launchRocketIfOnScreen)
  enemies.forEach(enemyCollisionWithBullet)
  moveBackground(airfighter)
  function moveEnemyRocket(enemy) {
    enemy.rocket.x += enemy.rocket.vx
  }

  function launchEnemyRocket(enemy) {
    enemy.rocket.vx = -8
  }

  function launchRocketIfOnScreen(enemy) {
    if (enemy.x < window.innerWidth) {
      if (!enemy.isRocketLaunched) {
        launchEnemyRocket(enemy)
        enemy.isRocketLaunched = true
      }
    }
  }

  if (rocket.x > airfighter.x + airfighter.rocketMaxDistance) {
    rocket.x = airfighter.x + rocketDefaultX
    rocket.y = airfighter.y + rocketDefaultY
    rocket.velocity -= 8
    rocket.dmg = 50
    rocket.element.src = 'img/Rocket.gif'
  }

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

function renderEnemyRocket(enemy) {
  enemy.rocket.element.style.left = enemy.rocket.x
  enemy.rocket.element.style.top = enemy.rocket.y
}

function moveEnemy(enemy) {
  if (!enemy.isRocketLaunched) {
    enemy.rocket.x += enemy.velocity
  }
  return (enemy.x += enemy.velocity)
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
