import {
  soundRocketHit,
  soundEnemyDieExplosion,
  soundMainTheme,
  soundGameOver,
  soundboss,
  soundLevelComplete,
  soundRocketShot,
} from './music.js'
import { levelCompleteScreen } from './levelCompleteScreen.js'
import { gameState } from './gameState.js'

export function gameOver() {
  document.querySelector('#gameover-screen').style.display = ''
  soundRocketHit.pause()
  soundMainTheme.pause()
  soundRocketShot.pause()
  soundboss.pause()
  soundGameOver.play()
  gameState.isGameOver = true
}

export function levelOverIfLastEnemyOut(lastEnemy, gameState) {
  const vuletivZaRamku = lastEnemy.x < 0 - lastEnemy.width
  if (vuletivZaRamku) {
    document.body.append(levelCompleteScreen)
    fadeIn(levelCompleteScreen)
    soundMainTheme.pause()
    soundMainTheme.currentTime = 0
    soundLevelComplete.play()
    gameState.isGamePaused = true
  }
}

function fadeIn(element) {
  element.className = 'fadeIn'
}
