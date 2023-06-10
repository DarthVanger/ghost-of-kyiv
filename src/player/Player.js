import { rocket } from '../rocket.js'
import {
  soundRocketHit,
  soundEnemyDieExplosion,
  soundMainTheme,
  soundGameOver,
  soundboss,
} from '../music.js'
import {
  moveShipDown,
  accelerateLeft,
  accelerateRight,
  moveShipUp,
} from './PlayerMovement.js'

class Player {
  x = 0
  y = 0
  vx = 0
  vy = 0
  ax = 0
  width = 300
  height = 130
  element = document.querySelector('#airfighter')

  moveShipDown = function () {
    moveShipDown(this)
  }
  moveShipUp = function () {
    moveShipUp(this)
  }

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
    this.vx = this.vx * 0.99
  }

  render() {
    this.vx += this.ax

    if (this.x >= 0) {
      this.x += this.vx
      if (rocket.velocity < 7) {
        rocket.x += this.vx
      }
    }

    this.slowDown()

    if (this.isKeyUpPressed) {
      this.moveShipUp()
    }
    if (this.isKeyDownPressed) {
      this.moveShipDown()
    }

    if (this.isKeyLeftPressed) {
      accelerateLeft(this)
    }
    if (this.isKeyRightPressed) {
      accelerateRight(this)
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
    document.querySelector('#gameover-screen').style.display = ''
    airfighter.x = 0
    airfighter.y = 0
    soundRocketHit.pause()
    soundEnemyDieExplosion.play()
    setTimeout(() => {
      soundMainTheme.pause()
      soundboss.pause()
      soundGameOver.play()
    }, 900)
  }
}
