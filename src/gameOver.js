import {
  soundRocketHit,
  soundEnemyDieExplosion,
  soundMainTheme,
  soundGameOver,
  soundboss,
} from './music.js'

export function gameOver() {
  document.querySelector('#gameover-screen').style.display = ''
  soundRocketHit.pause()
  soundEnemyDieExplosion.play()
  setTimeout(function () {
    soundMainTheme.pause()
    soundboss.pause()
    soundGameOver.play()
  }, 900)
}
