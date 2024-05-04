import { rocketDefaultX, rocketDefaultY } from '../rendering/Helpers.js'
import { isOutOfScreen } from '../utils/geometry.js'
import { gameState } from '../gameState.js'

export let rocketAmmo = 50

class Rocket {
  x = 80
  y = 70
  width = 120
  height = 20
  dmg = 50
  velocity = 8
  accelerationX = 0.5
  critChance = Math.floor(Math.random() * 100) < 25
  crit = Math.random() + 1
  element = document.createElement('img')
  moveToInitialPosition() {
    this.x = rocketDefaultX
    this.y = rocketDefaultY
  }
}

export function renderPlayerRocket() {
  for (let rocket of gameState.playerRockets) {
    rocket.element.style.left = rocket.x
    rocket.element.style.top = rocket.y

    removePlayerRocketIfOutOfScreen(rocket)
  }
}


function removePlayerRocketIfOutOfScreen(rocket) {
  if (isOutOfScreen(rocket)) {
    removePlayerRocket(rocket)
  }
}

export function movePlayerRocket() {
  for (let rocket of gameState.playerRockets) {
    rocket.velocity += rocket.accelerationX
    rocket.x += rocket.velocity
  }
}

export function createPlayerRocket(airfighter) {
  if (rocketAmmo > 0) {
    let rocket = new Rocket()
    rocket.element.src = 'img/mrRocket.gif'
    rocket.element.className = 'rocket'
    rocket.x = airfighter.x + rocketDefaultX
    rocket.y = airfighter.y + rocketDefaultY
    document.body.append(rocket.element)
    gameState.playerRockets.push(rocket)
    rocketAmmo -= 1
  }
}

export function removePlayerRocket(rocket) {
  const index = gameState.playerRockets.indexOf(rocket)
  gameState.playerRockets.splice(index, 1)
  rocket.element.remove()

  console.debug('Removed player rocket')
}

export function resetPlayerRocketAmmo() {
  rocketAmmo = 50
}

export function deleteUselessEnemyRockets() {
    let rockets = document.querySelectorAll('.enemyRocket')
    rockets.forEach((rocket) => {
    let rocketPositionX = parseInt(rocket.style.left)
     if (rocketPositionX < -200 || rocket.style.left == '') {
       rocket.remove()
    }
  })
}
