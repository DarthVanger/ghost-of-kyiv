import { rocket } from '../rocket.js'
import {
  soundRocketHit,
  soundEnemyDieExplosion,
  soundMainTheme,
  soundGameOver,
  soundboss,
} from '../music.js'
import PlayerMovement from './PlayerMovement.js'

class Player {
  x = 0
  y = 0
  vx = 0
  vy = 0
  width = 300
  height = 130
  element = document.querySelector('#airfighter')
  pm = new PlayerMovement()
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
      this.pm.afterForardDescceleration(airfighter)
      if (rocket.velocity < 7) {
        rocket.x += this.vx
      }
    }

    if (afterBackDesccelerationCondition) {
      this.pm.afterBackDescceleration(airfighter)
      if (rocket.velocity < 7) {
        rocket.x += this.vx
      }
    }
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
