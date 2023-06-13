import { gatling } from './gatling.js'
import { rocket } from './rocket.js'

export function resetAmmo(bullets, rockets) {
  gatling.ammo = bullets
  rocket.ammo = rockets
}

const ammoElement = document.createElement('div')

ammoElement.id = 'ammoElement'

document.body.append(ammoElement)

export function renderAmmo() {
  ammoElement.innerHTML = `
    <img class="ammoImg" src="img/ammo-gatling-img.gif">
    ${gatling.ammo}
    <br>
    <img class="ammoImg" src="img/ammo-rocket-img.gif">
    ${rocket.ammo}
  `
}
