import { Step, fps } from './step.js'
import { gameState } from './gameState.js'

const pauseScreen = document.querySelector('#pause-screen');
let pause = document.querySelector('#pause');
let play = document.querySelector('#play');
let continueGame = document.querySelector('.continue');
let restart = document.querySelector('.restart')

export function gamePauseAction() {
  if (gameState.isGamePaused) {
    unPauseGame()
    play.style.display = 'none'
    pause.style.display = 'block'
  } else {
    pauseGame()
    play.style.display = 'block'
    pause.style.display = 'none'
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

play.addEventListener('click', gamePauseAction)
pause.addEventListener('click', gamePauseAction)
continueGame.addEventListener('click', gamePauseAction)
restart.addEventListener('click', () => {
  location.reload()
})