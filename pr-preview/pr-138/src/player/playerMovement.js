import {
  soundRocketHit,
  soundEnemyDieExplosion,
  soundMainTheme,
  soundGameOver,
  soundboss,
} from '../music.js'
import { rocket } from '../rocket.js'

const acceleration = 1
function accelerationBack(airfighter) {
  const maxBackSpeed = airfighter.vx < -5
  if (airfighter.x > 0) {
    airfighter.x += airfighter.vx
    if (!maxBackSpeed) {
      airfighter.vx -= acceleration / 2
    }
  }
}

function accelerationForward(airfighter) {
  const maxForwardSpeed = airfighter.vx >= 10
  if (airfighter.x + airfighter.width < screen.width) {
    airfighter.x += airfighter.vx
    if (!maxForwardSpeed) {
      airfighter.vx += acceleration
    }
  }
}

export function afterForardDescceleration(airfighter) {
  airfighter.x += airfighter.vx
  airfighter.vx -= acceleration / 4
}

export function afterBackDescceleration(airfighter) {
  airfighter.x += airfighter.vx
  airfighter.vx += acceleration / 8
}

export function moveShipDown(airfighter) {
  if (airfighter.y + airfighter.height > window.innerHeight - 50) {
    document.querySelector('#gameover-screen').style.display = ''
    airfighter.x = 0
    airfighter.y = 0
    soundRocketHit.pause()
    soundEnemyDieExplosion.play()
    setTimeout(function () {
      soundMainTheme.pause()
      soundboss.pause()
      soundGameOver.play()
    }, 900)
  }
  airfighter.y += 10
  if (rocket.velocity < 7) {
    rocket.y += 10
  }
}

export function moveShipLeft(airfighter) {
  if (airfighter.x > 0) {
    accelerationBack(airfighter)
    if (rocket.velocity < 7) {
      rocket.x += airfighter.vx
    }
  }
}

export function moveShipRight(airfighter) {
  accelerationForward(airfighter)
  if (rocket.velocity < 7) {
    rocket.x += airfighter.vx
  }
}

export function moveShipUp(airfighter) {
  if (airfighter.y > 0) {
    airfighter.y -= 10
    if (rocket.velocity < 7) {
      rocket.y -= 10
    }
  }
}