import { soundMainTheme, soundIntro} from "./music.js";

function handleStartGameBtnClick() {
  hideStartScreen();
}

function hideStartScreen() {
  let startScreen = document.querySelector("#start-screen");
  startScreen.remove();
}

const startGameButton = document.querySelector("#startGameButton");
startGameButton.addEventListener("click", handleStartGameBtnClick);
