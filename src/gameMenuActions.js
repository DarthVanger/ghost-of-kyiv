import { Step, fps } from './step.js'
import { gameState } from './gameState.js'

const pauseScreen = document.querySelector('#pause-screen')

export function gamePauseAction() {
  if (gameState.isGamePaused) {
    unPauseGame()
  } else {
    pauseGame()
  }
}

function unPauseGame() {
  requestAnimationFrame(Step)
  pauseScreen.style.display = 'none'
  gameState.isGamePaused = false
}

function pauseGame() {
  pauseScreen.style.display = 'block'
  gameState.isGamePaused = true
}
