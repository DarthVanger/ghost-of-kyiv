import { gameState, Step, fps } from './step.js'

const pauseScreen = document.querySelector('#pause-screen')

export function gamePauseAction() {
  if (gameState.isGamePaused) {
    unPauseGame()
  } else {
    pauseGame()
  }
}

function unPauseGame() {
  gameState.gameIntervalId = setInterval(Step, 1000 / fps)
  pauseScreen.style.display = 'none'
  gameState.isGamePaused = false
}

function pauseGame() {
  clearInterval(gameState.gameIntervalId)
  pauseScreen.style.display = 'block'
  gameState.isGamePaused = true
}
