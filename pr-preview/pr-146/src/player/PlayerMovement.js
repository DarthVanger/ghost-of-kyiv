import {
  soundRocketHit,
  soundEnemyDieExplosion,
  soundMainTheme,
  soundGameOver,
  soundboss,
} from '../music.js'
import { rocket } from '../rocket.js'

const acceleration = 1

function accelerationBack(player) {
  const maxBackSpeed = player.vx < -5
  if (player.x > 0) {
    player.x += player.vx
    if (!maxBackSpeed) {
      player.vx -= acceleration / 2
    }
  }
}

function accelerationForward(player) {
  const maxForwardSpeed = player.vx >= 10
  if (player.x + player.width < screen.width) {
    player.x += player.vx
    if (!maxForwardSpeed) {
      player.vx += acceleration
    }
  }
}

export function afterForardDescceleration(player) {
  player.x += player.vx
  player.vx -= acceleration / 4
}

export function afterBackDescceleration(player) {
  player.x += player.vx
  player.vx += acceleration / 8
}

export function moveShipDown(player) {
  if (player.y + player.height > window.innerHeight - 50) {
    document.querySelector('#gameover-screen').style.display = ''
    player.x = 0
    player.y = 0
    soundRocketHit.pause()
    soundEnemyDieExplosion.play()
    setTimeout(function () {
      soundMainTheme.pause()
      soundboss.pause()
      soundGameOver.play()
    }, 900)
  }
  player.y += 10
  if (rocket.velocity < 7) {
    rocket.y += 10
  }
}

export function moveShipLeft(player) {
  if (player.x > 0) {
    accelerationBack(player)
    if (rocket.velocity < 7) {
      rocket.x += player.vx
    }
  }
}

export function moveShipRight(player) {
  accelerationForward(player)
  if (rocket.velocity < 7) {
    rocket.x += player.vx
  }
}

export function moveShipUp(player) {
  if (player.y > 0) {
    player.y -= 10
    if (rocket.velocity < 7) {
      rocket.y -= 10
    }
  }
}
