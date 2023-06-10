import {
  soundRocketHit,
  soundEnemyDieExplosion,
  soundMainTheme,
  soundGameOver,
  soundboss,
} from '../music.js'

export function gameOver(player) {
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
