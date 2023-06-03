import { rocket } from './rocket.js'
import {
  soundRocketHit,
  soundEnemyDieExplosion,
  soundMainTheme,
  soundGameOver,
} from './music.js'

const acceleration = 1

class Player {
  x = 0
  y = 0
  vx = 0
  vy = 0
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
  isShipMovingUp = false
  isShipMovingLeft = false
  isShipMovingRight = false
  isShipMovingDown = false

  render() {
    const afterForardDesccelerationCondition =
      this.vx > 0 && this.isShipMovingRight == false
    const afterBackDesccelerationCondition =
      this.vx < 0 && this.isShipMovingLeft == false

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

    if (afterForardDesccelerationCondition) {
      afterForardDescceleration()
      if (rocket.velocity < 7) {
        rocket.x += this.vx
      }
    }

    if (afterBackDesccelerationCondition) {
      afterBackDescceleration()
      if (rocket.velocity < 7) {
        rocket.x += this.vx
      }
    }
  }

  moveToInitalPosition() {
    this.x = 0
    this.y = 0
  }
}

export let airfighter = new Player()

function accelerationBack() {
  const maxBackSpeed = airfighter.vx < -5
  if (airfighter.x > 0) {
    airfighter.x += airfighter.vx
    if (!maxBackSpeed) {
      airfighter.vx -= acceleration / 2
    }
  }
}

function accelerationForward() {
  const maxForwardSpeed = airfighter.vx >= 10
  if (airfighter.x + airfighter.width < screen.width) {
    airfighter.x += airfighter.vx
    if (!maxForwardSpeed) {
      airfighter.vx += acceleration
    }
  }
}

function afterForardDescceleration() {
  airfighter.x += airfighter.vx
  airfighter.vx -= acceleration / 4
}

function afterBackDescceleration() {
  airfighter.x += airfighter.vx
  airfighter.vx += acceleration / 8
}

export function moveShipDown() {
  if (airfighter.y + airfighter.height > window.innerHeight - 50) {
    document.querySelector('#gameover-screen').style.display = ''
    airfighter.x = 0
    airfighter.y = 0
    soundRocketHit.pause()
    soundEnemyDieExplosion.play()
    setTimeout(function () {
      soundMainTheme.pause()
      soundGameOver.play()
    }, 900)
  }
  airfighter.y += 10
  if (rocket.velocity < 7) {
    rocket.y += 10
  }
}

export function moveShipLeft() {
  if (airfighter.x > 0) {
    accelerationBack()
    if (rocket.velocity < 7) {
      rocket.x += airfighter.vx
    }
  }
}

export function moveShipRight() {
  accelerationForward()
  if (rocket.velocity < 7) {
    rocket.x += airfighter.vx
  }
}

export function moveShipUp() {
  if (airfighter.y > 0) {
    airfighter.y -= 10
    if (rocket.velocity < 7) {
      rocket.y -= 10
    }
  }
}
