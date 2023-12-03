import { rocketDefaultX, rocketDefaultY } from './rendering/Helpers.js'

export let rockets = []

export let rocketAmmo = 50

class Rocket {
  x = 80
  y = 70
  width = 120
  dmg = 50
  velocity = 8
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
