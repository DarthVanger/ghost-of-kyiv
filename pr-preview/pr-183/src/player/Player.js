import { rockets, removePlayerRocket } from '../rocket.js'
import { gameOver } from '../gameOver.js'
import { updateSpeedometer } from '../speedometer.js'
const acceleration = 1

class Player {
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
  rocketMaxDistance = 1500
  isKeyUpPressed = false
  isKeyLeftPressed = false
  isKeyRightPressed = false
  isKeyDownPressed = false

  slowDown() {
    this.vx = this.vx * 0.96
  }

  render() {
    updateSpeedometer(this.vx, this.ax, this.vy)
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

    if (this.isKeyUpPressed) {
      this.vy = -10
    }
    if (this.isKeyDownPressed) {
      this.vy = +10
    }

    if (this.isKeyLeftPressed) {
      this.ax = -acceleration / 2
    }
    if (this.isKeyRightPressed) {
      this.ax = acceleration
    }
    if (!this.isKeyRightPressed && !this.isKeyLeftPressed) {
      this.ax = 0
    }
    if (!this.isKeyUpPressed && !this.isKeyDownPressed) {
      this.vy = 0
    }

    this.element.style.left = this.x
    this.element.style.top = this.y
    this.health.element.style.left = this.x
    this.health.element.style.top = this.y
    this.health.element.style.width = this.width
    this.health.element.style.height = this.height * 0.1
    this.healthtext.element.value =
      this.health.element.value / this.health.element.max
    this.healthtext.element.innerHTML = `${this.health.element.value} / ${this.health.element.max} HP`
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
    this.y = 0
  }
}

export let airfighter = new Player()

export function playerDiesIfHpBelowZiro() {
  if (airfighter.health.element.value <= 0) {
    gameOver()
  }
}

function playerDiesWhenCrashed(player) {
  if (player.y + player.height > window.innerHeight - 50) {
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
