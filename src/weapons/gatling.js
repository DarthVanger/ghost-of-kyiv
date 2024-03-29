import { soundGatling } from '../music.js'
import { gameState } from '../gameState.js'

export let gatling = {
  velocity: -2,
  ammo: 1500,
  element: document.querySelector('#gatling'),
}
let gatlingCooldown = false
export let bulletArray = []

function setGatlingCooldown(c) {
  gatlingCooldown = c
}

function createBullet() {
  const airfighter = gameState.airfighter

  const bullet = {}
  bullet.width = 50
  bullet.height = 20
  bullet.element = document.createElement('img')
  // Restart gif animation - https://stackoverflow.com/a/2831728
  bullet.element.src = 'img/Bullet-With-Fireball.gif?rnd=' + Math.random()
  bullet.element.className = 'bullet'
  bullet.element.style.width = bullet.width + 'px'
  bullet.velocity = 12
  bullet.x = airfighter.x + airfighter.width + Math.random() * 4 - 25
  bullet.y = airfighter.y + airfighter.height / 2 - 20
  bullet.dmg = 5
  bullet.critChance = Math.floor(Math.random() * 100) < 10
  bullet.margin = Math.random() * 2 - 1
  document.body.append(bullet.element)
  gatling.ammo -= 1
  bulletArray.push(bullet)
}

export function removeBullet(bullet) {
  bullet.element.remove()
  bulletArray = bulletArray.filter((anotherBullet) => anotherBullet !== bullet)
}

export function fireGatlingPlayer() {
  if (gatling.ammo > 0 && !gatlingCooldown) {
    createBullet()
    soundGatling.play()
    setGatlingCooldown(true)
    setTimeout(function () {
      setGatlingCooldown(false)
    }, 20)
  }
}

export function addGatling(enemy) {
  document
    .querySelector('#game-background')
    .addEventListener('click', fireGatlingPlayer)
  enemy.element.addEventListener('click', fireGatlingPlayer)
  document
    .querySelector('#airfighter')
    .addEventListener('click', fireGatlingPlayer)
}

export function moveBullet(bullet) {
  if(bullet.x - bullet.width < window.innerWidth) {
    bullet.x += bullet.velocity
    bullet.y += bullet.margin
    bullet.element.style.left = bullet.x + 'px'
    bullet.element.style.top = bullet.y + 'px'
  } else{
    removeBullet(bullet)
  }
}
