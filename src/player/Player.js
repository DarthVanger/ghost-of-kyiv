import {
  rockets,
  removePlayerRocket,
  createPlayerRocket,
} from '../weapons/rocket.js'
import { createPlayerFlare } from '../weapons/flare.js'
import { gameOver } from '../gameOver.js'
import { controls, keyCode } from '../keyboard.js'
import { soundRocketShot } from '../music.js'
import { gameState } from '../gameState.js'
import { fireGatlingPlayer } from '../weapons/gatling.js'
let rocketCooldown = false
let flareCooldown = false
const acceleration = 1

export class Player {
  x = 0
  y = 0
  vx = 0
  vy = 0
  ax = 0
  width = 300
  height = 130
  element = document.querySelector('#airfighter')

  health = {
    x: 0,
    y: 0,
    element: document.querySelector('#playerHealth'),
  }
  healthtext = {
    x: 0,
    y: 0,
    element: document.querySelector('#playerHealthText'),
  }
  isKeyUpPressed = false
  isKeyLeftPressed = false
  isKeyRightPressed = false
  isKeyDownPressed = false

  slowDown() {
    this.vx = this.vx * 0.96
  }

  getHitBox() {
    return {
      x: this.x + this.width - 220,
      y: this.y + this.height / 2 - 80 / 2,
      width: 220,
      height: 56,
    }
  }

  render() {
    this.vx += this.ax
    this.x += this.vx
    this.y += this.vy

    if (this.x <= 0) {
      this.x = 0
      this.vx = 0
      this.ax = 0
    }

    if (this.y <= 0) {
      this.y = 0
    }

    if (this.x + this.width >= window.innerWidth) {
      this.x = window.innerWidth - this.width
      this.vx = 0
      this.ax = 0
    }

    this.slowDown()
    const isPressedMovementKeyCode = {
      left: controls.includes(keyCode.a) || controls.includes(keyCode.left),
      right: controls.includes(keyCode.d) || controls.includes(keyCode.right),
      up: controls.includes(keyCode.w) || controls.includes(keyCode.up),
      down: controls.includes(keyCode.s) || controls.includes(keyCode.down),
    }
    if (isPressedMovementKeyCode.up) {
      this.vy = -10
      this.element.src = 'img/aifighter-Up.gif'
    }
    if (isPressedMovementKeyCode.down) {
      this.vy = +10
      this.element.src = 'img/aifighter-Down.gif'
    }
    if (isPressedMovementKeyCode.left) {
      this.ax = -acceleration / 2
      this.element.src = 'img/aifighter-Back.gif'
    }
    if (isPressedMovementKeyCode.right) {
      this.ax = acceleration
      this.element.src = 'img/aifighter-Front-Accelerate.gif'
    }

    if (!isPressedMovementKeyCode.right && !isPressedMovementKeyCode.left) {
      this.ax = 0
    }
    if (!isPressedMovementKeyCode.up && !isPressedMovementKeyCode.down) {
      this.vy = 0
    }
    if (
      !isPressedMovementKeyCode.right &&
      !isPressedMovementKeyCode.left &&
      !isPressedMovementKeyCode.up &&
      !isPressedMovementKeyCode.down
    ) {
      this.element.src = 'img/aifighter-Front.gif'
    }
    if (controls.includes(keyCode.r)) {
      fireRocket()
    }
    if (controls.includes(keyCode.space)) {
      fireGatlingPlayer()
    }
    if (controls.includes(keyCode.f)) {
      releaseFlares()
    }

    this.element.style.left = this.x
    this.element.style.top = this.y
    this.health.element.style.left = this.x
    this.health.element.style.top = this.y
    this.health.element.style.width = this.width
    this.health.element.style.height = this.height * 0.1
    this.healthtext.element.value =
      this.health.element.value / this.health.element.max
    this.healthtext.element.innerText = `${this.health.element.value} / ${this.health.element.max} HP`
    this.healthtext.element.style.left = this.x
    this.healthtext.element.style.top = this.y - 35
    this.healthtext.element.style.width = this.width
    playerDiesWhenCrashed(this)
    removePlayerRocketIfMaxDistance()
  }

  resetLife() {
    this.health.element.value = 100
  }

  moveToInitalPosition() {
    this.x = 0
    this.y = window.innerHeight / 2 - this.height / 2
  }
}

function playerDiesWhenCrashed(player) {
  if (player.y + player.height / 2 > window.innerHeight) {
    gameOver()
  }
}

function removePlayerRocketIfMaxDistance() {
  for (let rocket of rockets) {
    if (rocket.x > window.innerWidth) {
      removePlayerRocket(rocket)
    }
  }
}

function fireRocket() {
  if (!rocketCooldown) {
    createPlayerRocket(gameState.airfighter)
    soundRocketShot.play()
    setRocketCooldown(true)
    setTimeout(function () {
      setRocketCooldown(false)
    }, 220)
  }
}

function releaseFlares() {
  if (!flareCooldown) {
    flareCooldown = true
    createPlayerFlare(gameState.airfighter)
    setTimeout(function () {
      flareCooldown = false
    }, 500)
  }
}

function setRocketCooldown(c) {
  rocketCooldown = c
}
