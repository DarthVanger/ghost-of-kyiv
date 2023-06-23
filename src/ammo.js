import { gatling } from './gatling.js'
import { resetPlayerRocketAmmo, rocketAmmo } from './rocket.js'

export function resetAmmo(bullets) {
  gatling.ammo = bullets
  resetPlayerRocketAmmo()
}

const ammoElement = document.createElement('div')

const ammoImgContainer = document.createElement('div')
const ammoCountElement = document.createElement('div')
ammoCountElement.id = 'ammoCountElement'

ammoElement.id = 'ammoElement'

ammoElement.append(ammoImgContainer)
ammoElement.append(ammoCountElement)

addAmmoImages()

document.body.append(ammoElement)

export function renderAmmo() {
  renderAmmoCount()
}

function addAmmoImages() {
  ammoImgContainer.innerHTML = `
    <img class="ammoImg" src="img/ammo-gatling-img.gif">
    <br>
    <img class="ammoImg" src="img/ammo-rocket-img.gif">
  `
}

function renderAmmoCount() {
  ammoCountElement.innerHTML = `
    <div id="gatling-ammo">${gatling.ammo}</div>
    <div id="rocket-ammo">${rocketAmmo}</div>
  `
}
