import { gatling } from './gatling.js'
import { resetPlayerRocketAmmo, rocketAmmo } from './rocket.js'

export function resetAmmo(bullets) {
  gatling.ammo = bullets
  resetPlayerRocketAmmo()
}

const ammoElement = document.createElement('div')

const ammoImgContainer = document.createElement('div')
const ammoCountElement = document.createElement('div')

const gatlingAmmoElement = document.createElement('div')
const rocketAmmoElement = document.createElement('div')
gatlingAmmoElement.id = `gatling-ammo`
rocketAmmoElement.id = `rocket-ammo`
ammoCountElement.append(gatlingAmmoElement)
ammoCountElement.append(rocketAmmoElement)

gatlingAmmoElement.innerText = gatling.ammo
rocketAmmoElement.innerText = rocketAmmo
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
  gatlingAmmoElement.innerText = gatling.ammo
  rocketAmmoElement.innerText = rocketAmmo
}
