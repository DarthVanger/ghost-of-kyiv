import { startGame } from './gameManager.js';

let isGameStarted = false;

let introduction = document.querySelector('#introduction');

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

function playIntroStory() {
  soundIntro.play();
}

function restartLevel() {
  document.location.reload();
}

const restartLevelButton = document.querySelector('#restartLevelButton');
restartLevelButton.addEventListener('click', restartLevel)
