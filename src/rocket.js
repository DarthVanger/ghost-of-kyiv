import { airfighter } from './player/Player.js'
import { rocketDefaultX, rocketDefaultY } from './rendering/Helpers.js'

export let rockets = []

class Rocket {
  x = 80
  y = 70
  width = 120
  ammo = 10
  dmg = 50
  velocity = 8
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

export function createPlayerRocket() {
  let rocket = new Rocket()
  rocket.element.src = 'img/mrRocket.gif'
  rocket.element.className = 'rocket'
  rocket.x = airfighter.x + rocketDefaultX
  rocket.y = airfighter.y + rocketDefaultY
  document.body.append(rocket.element)
  rockets.push(rocket)
}
