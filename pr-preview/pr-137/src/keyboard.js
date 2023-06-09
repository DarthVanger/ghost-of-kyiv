import { rocket } from './rocket.js'
import { fireGatlingEnemy } from './gatling.js'
import { airfighter } from './airfighter.js'
import { mobileControls } from './touch.js'
import { gamePauseAction } from './gameMenuActions.js'
import { soundRocketShot } from './music.js'

export function initKeybordMovement() {
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
  mobileControls.leftButton.addEventListener('touchstart', function () {
    airfighter.isShipMovingLeft = true
  })
  mobileControls.rightButton.addEventListener('touchstart', function () {
    airfighter.isShipMovingRight = true
  })
  mobileControls.topButton.addEventListener('touchstart', function () {
    airfighter.isShipMovingUp = true
  })
  mobileControls.bottomButton.addEventListener('touchstart', function () {
    airfighter.isShipMovingDown = true
  })
  mobileControls.leftButton.addEventListener('touchend', function () {
    airfighter.isShipMovingLeft = false
  })
  mobileControls.rightButton.addEventListener('touchend', function () {
    airfighter.isShipMovingRight = false
  })
  mobileControls.topButton.addEventListener('touchend', function () {
    airfighter.isShipMovingUp = false
  })
  mobileControls.bottomButton.addEventListener('touchend', function () {
    airfighter.isShipMovingDown = false
  })
  mobileControls.fireButton.addEventListener('click', fireRocket)
}

function handleKeyDown(event) {
  if ((event.key == 'r' || event.key == 'к') && rocket.ammo != 0) {
    fireRocket()
  }

  if (event.key == 'a' || event.key == 'ф') {
    airfighter.isShipMovingLeft = true
    if (airfighter.element.src != 'img/aifighter-Back.gif') {
      airfighter.element.src = 'img/aifighter-Back.gif'
    }
  }

  if (event.key == 's' || event.key == 'ы' || event.key == 'і') {
    airfighter.isShipMovingDown = true
    if (airfighter.element.src != 'img/aifighter-Down.gif') {
      airfighter.element.src = 'img/aifighter-Down.gif'
    }
  }

  if (event.key == 'w' || event.key == 'ц') {
    airfighter.isShipMovingUp = true
    if (airfighter.element.src != 'img/aifighter-Up.gif') {
      airfighter.element.src = 'img/aifighter-Up.gif'
    }
  }

  if (event.key == 'd' || event.key == 'в') {
    airfighter.isShipMovingRight = true
    if (airfighter.element.src != 'img/aifighter-Front-Accelerate.gif') {
      airfighter.element.src = 'img/aifighter-Front-Accelerate.gif'
    }
  }

  if (event.key == 'p' || event.key == 'з') {
    gamePauseAction()
  }
  if (event.key == ' ') {
    fireGatlingEnemy()
  }
}

function handleKeyUp(event) {
  if (event.key == 'a' || event.key == 'ф') {
    airfighter.isShipMovingLeft = false
    airfighter.element.src = 'img/aifighter-Front.gif'
  }

  if (event.key == 's' || event.key == 'ы' || event.key == 'і') {
    airfighter.isShipMovingDown = false
    airfighter.element.src = 'img/aifighter-Front.gif'
  }

  if (event.key == 'w' || event.key == 'ц') {
    airfighter.isShipMovingUp = false
    airfighter.element.src = 'img/aifighter-Front.gif'
  }

  if (event.key == 'd' || event.key == 'в') {
    airfighter.isShipMovingRight = false
    airfighter.element.src = 'img/aifighter-Front.gif'
  }
}

function fireRocket() {
  if (rocket.velocity < 8) {
    rocket.velocity += 8
    rocket.ammo -= 1
    rocket.element.src = 'img/Rocket.gif'
    setTimeout(preRocket, 8)
    soundRocketShot.play()
  }
}

function preRocket() {
  rocket.element.src = 'img/mrRocket.gif'
}

