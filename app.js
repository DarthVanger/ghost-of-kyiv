import { endGameAction } from './src/gameManager.js'
import './src/startScreen.js'

const endGameButton = document.querySelector('#endGameButton')
endGameButton.addEventListener('click', endGameAction)
