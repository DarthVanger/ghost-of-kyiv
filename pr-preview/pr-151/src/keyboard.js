import { rocket } from './rocket.js'
import { fireGatlingEnemy } from './gatling.js'
import { airfighter } from './player/Player.js'
import { mobileControls } from './touch.js'
import { gamePauseAction } from './gameMenuActions.js'
import { soundRocketShot } from './music.js'

export function initKeybordMovement() {
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
  mobileControls.leftButton.addEventListener('touchstart', function () {
    airfighter.isKeyLeftPressed = true
  })
  mobileControls.rightButton.addEventListener('touchstart', function () {
    airfighter.isKeyRightPressed = true
  })
  mobileControls.topButton.addEventListener('touchstart', function () {
    airfighter.isKeyUpPressed = true
  })
  mobileControls.bottomButton.addEventListener('touchstart', function () {
    airfighter.isKeyDownPressed = true
  })
  mobileControls.leftButton.addEventListener('touchend', function () {
    airfighter.isKeyLeftPressed = false
  })
  mobileControls.rightButton.addEventListener('touchend', function () {
    airfighter.isKeyRightPressed = false
  })
  mobileControls.topButton.addEventListener('touchend', function () {
    airfighter.isKeyUpPressed = false
  })
  mobileControls.bottomButton.addEventListener('touchend', function () {
    airfighter.isKeyDownPressed = false
  })
  mobileControls.fireButton.addEventListener('click', fireRocket)
}

function handleKeyDown(event) {
  if ((event.key == 'r' || event.key == 'к') && rocket.ammo != 0) {
    fireRocket()
  }

  if (event.key == 'a' || event.key == 'ф') {
    airfighter.isKeyLeftPressed = true
    airfighter.element.src = 'img/aifighter-Back.gif'
  }

  if (event.key == 's' || event.key == 'ы' || event.key == 'і') {
    airfighter.isKeyDownPressed = true
    airfighter.element.src = 'img/aifighter-Down.gif'
  }

  if (event.key == 'w' || event.key == 'ц') {
    airfighter.isKeyUpPressed = true
    airfighter.element.src = 'img/aifighter-Up.gif'
  }

  if (event.key == 'd' || event.key == 'в') {
    airfighter.isKeyRightPressed = true
    airfighter.element.src = 'img/aifighter-Front-Accelerate.gif'
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
    airfighter.isKeyLeftPressed = false
    airfighter.element.src = 'img/aifighter-Front.gif'
  }

  if (event.key == 's' || event.key == 'ы' || event.key == 'і') {
    airfighter.isKeyDownPressed = false
    airfighter.element.src = 'img/aifighter-Front.gif'
  }

  if (event.key == 'w' || event.key == 'ц') {
    airfighter.isKeyUpPressed = false
    airfighter.element.src = 'img/aifighter-Front.gif'
  }

  if (event.key == 'd' || event.key == 'в') {
    airfighter.isKeyRightPressed = false
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
