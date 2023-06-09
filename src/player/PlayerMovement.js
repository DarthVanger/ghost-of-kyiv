import {
  soundRocketHit,
  soundEnemyDieExplosion,
  soundMainTheme,
  soundGameOver,
  soundboss,
} from '../music.js'
import { rocket } from '../rocket.js'

class PlayerMovement {
  acceleration = 1

  constructor(player) {
    this.player = player
  }

  accelerationBack() {
    const maxBackSpeed = this.player.vx < -5
    if (this.player.x > 0) {
      this.player.x += this.player.vx
      if (!maxBackSpeed) {
        this.player.vx -= acceleration / 2
      }
    }
  }

  accelerationForward() {
    const maxForwardSpeed = this.player.vx >= 10
    if (this.player.x + this.player.width < screen.width) {
      this.player.x += this.player.vx
      if (!maxForwardSpeed) {
        this.player.vx += acceleration
      }
    }
  }

  afterForardDescceleration() {
    this.player.x += this.player.vx
    this.player.vx -= acceleration / 4
  }

  afterBackDescceleration() {
    this.player.x += this.player.vx
    this.player.vx += acceleration / 8
  }

  moveShipDown() {
    if (this.player.y + this.player.height > window.innerHeight - 50) {
      document.querySelector('#gameover-screen').style.display = ''
      this.player.x = 0
      this.player.y = 0
      soundRocketHit.pause()
      soundEnemyDieExplosion.play()
      setTimeout(function () {
        soundMainTheme.pause()
        soundboss.pause()
        soundGameOver.play()
      }, 900)
    }
    this.player.y += 10
    if (rocket.velocity < 7) {
      rocket.y += 10
    }
  }

  moveShipLeft() {
    if (this.player.x > 0) {
      accelerationBack(this.player)
      if (rocket.velocity < 7) {
        rocket.x += this.player.vx
      }
    }
  }

  moveShipRight() {
    accelerationForward(this.player)
    if (rocket.velocity < 7) {
      rocket.x += this.player.vx
    }
  }

  moveShipUp() {
    if (this.player.y > 0) {
      this.player.y -= 10
      if (rocket.velocity < 7) {
        rocket.y -= 10
      }
    }
  }
}

export default PlayerMovement
