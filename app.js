import { soundIntro} from "./music.js";
import { endGameAction } from './gameManager.js';

function handleStartGameBtnClick() {
  soundIntro.play();
  hideStartScreen();
}

function hideStartScreen() {
  let startScreen = document.querySelector("#start-screen");
  startScreen.remove();
}

const startGameButton = document.querySelector("#startGameButton");
const endGameButton = document.querySelector('#endGameButton');
endGameButton.addEventListener('click', endGameAction)
startGameButton.addEventListener("click", handleStartGameBtnClick);
