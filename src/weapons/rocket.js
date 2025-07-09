import { rocketDefaultX, rocketDefaultY } from '../rendering/Helpers.js'
import { gameState } from '../gameState.js'


export let rockets = []

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

export function renderRocket() {
  for (let rocket of rockets) {
    rocket.element.style.left = rocket.x
    rocket.element.style.top = rocket.y
  }
}

export function moveRocket() {
  for (let rocket of rockets) {
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
    rockets.push(rocket)
    rocketAmmo -= 1
  }
}

export function removePlayerRocket(rocket) {
  const index = rockets.indexOf(rocket)
  rockets.splice(index, 1)
  rocket.element.remove()
}

export function resetPlayerRocketAmmo() {
  rocketAmmo = 50
}

export function deleteUselessEnemyRockets() {
  for (const enemy of gameState.enemies) {
    for (const enemyRocket of enemy.rockets) {
      if (enemyRocket.x < -200 ) {
        const index = enemy.rockets.indexOf(enemyRocket)
        enemy.rockets.splice(index, 1)
      }
    }
  }
}
