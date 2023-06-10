import {
  soundRocketHit,
  soundEnemyDieExplosion,
  soundMainTheme,
  soundGameOver,
  soundboss,
} from '../music.js'
import { rocket } from '../rocket.js'

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

export function moveShipUp(player) {
  if (player.y > 0) {
    player.y -= 10
    if (rocket.velocity < 7) {
      rocket.y -= 10
    }
  }
}
