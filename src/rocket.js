import { rocketDefaultX, rocketDefaultY } from './rendering/Helpers.js'
class Rocket {
  x = 80
  y = 70
  width = 120
  ammo = 10
  dmg = 50
  velocity = 0
  element = document.querySelector('#rocket')

  moveToInitialPosition() {
    this.x = rocketDefaultX
    this.y = rocketDefaultY
  }
}

export let rocket = new Rocket()

export function renderRocket() {
  rocket.element.style.left = rocket.x
  rocket.element.style.top = rocket.y
}

export function moveRocket() {
  rocket.x += rocket.velocity
}
