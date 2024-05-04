import { gameState } from '../gameState.js'

const scoreElement = document.createElement('div')
scoreElement.id = 'score'

scoreElement.innerHTML = `
  <img src="img/star.png" /> <span id="score-text">${gameState.score}</span>
`
const scoreText = scoreElement.querySelector('#score-text')

document.querySelector('#game-background').append(scoreElement)

export function renderCurrentScore() {
  scoreText.innerText = gameState.score
}

renderCurrentScore()
