import { soundMainTheme, soundIntro} from "./music.js";
import { startGame, endGameAction } from './gameManager.js';

let isGameStarted = false;

function handleStartGameBtnClick() {
  soundIntro.play();
  hideStartScreen();
}

function hideStartScreen() {
  let startScreen = document.querySelector("#start-screen");
  startScreen.remove();
}

let introduction = document.querySelector('#introduction');
const startGameButton = document.querySelector("#startGameButton");
const endGameButton = document.querySelector('#endGameButton');
endGameButton.addEventListener('click', endGameAction)
startGameButton.addEventListener("click", handleStartGameBtnClick);

function introductionSkip() {
  if (!isGameStarted) {
    startGame();
    soundMainTheme.play();
    soundMainTheme.volume = 0.3;
    introduction.remove();
    introduction.style.zIndex = 1;
    soundIntro.pause();
    isGameStarted = true;
  } 
}

introduction.addEventListener('click', introductionSkip);
