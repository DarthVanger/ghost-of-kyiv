import {
  soundRocketHit,
  soundEnemyDieExplosion,
  soundMainTheme,
  soundGameOver,
  soundboss,
  soundLevelComplete
} from './music.js'
import { levelCompleteScreen } from './levelCompleteScreen.js'

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

export function levelOverIfLastEnemyOut(lastEnemy, gameState) {
  const vuletivZaRamku = lastEnemy.x < 0 - lastEnemy.width
  if (vuletivZaRamku) {
    stopInterval(gameState)
    document.body.append(levelCompleteScreen)
    fadeIn(levelCompleteScreen)
    soundMainTheme.pause()
    soundMainTheme.currentTime = 0
    soundLevelComplete.play()
  }
}

function fadeIn(element) {
  element.className = 'fadeIn'
}

function stopInterval(gameState) {
  clearInterval(gameState.gameIntervalId)
  gameState.isGamePaused = true
}
