import { addGatling } from "./gatling.js";
import { airfighter } from "./airfighter.js";
import { enemies } from './enemy.js';
import { soundRocketShot, soundRocketHit, soundEnemyDieExplosion, soundGameOver, soundMainTheme, soundLevelComplete, soundIntro} from "./music.js";
import { mobileControls } from './touch.js';
import { rocket } from './rocket.js';
import { Step } from './step.js';

export const fps = 60;
export let gameFps;
export let isGameStarted = false;
export let isGamePaused = false;

function startGame() {
  initKeybordMovement();
  enemies.forEach(addGatling);
  gameFps = setInterval(Step, 1000 / fps);
}

function initKeybordMovement() {
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  mobileControls.leftButton.addEventListener('touchstart' , function () {
    airfighter.isShipMovingLeft = true;
});
  mobileControls.rightButton.addEventListener('touchstart' ,  function () {
    airfighter.isShipMovingRight = true;
});
  mobileControls.topButton.addEventListener('touchstart' , function () {
    airfighter.isShipMovingUp = true;
});
  mobileControls.bottomButton.addEventListener('touchstart' ,  function () {
    airfighter.isShipMovingDown = true;
});
mobileControls.leftButton.addEventListener('touchend' , function () {
  airfighter.isShipMovingLeft = false;
});
mobileControls.rightButton.addEventListener('touchend' ,  function () {
  airfighter.isShipMovingRight = false;
});
mobileControls.topButton.addEventListener('touchend' , function () {
  airfighter.isShipMovingUp = false;
});
mobileControls.bottomButton.addEventListener('touchend' ,  function () {
  airfighter.isShipMovingDown = false;
});
  mobileControls.fireButton.addEventListener('click' , fireRocket);
}

function handleKeyDown(event) {
  if ((event.key == "r" || event.key == 'к' || event.key == ' ') && rocket.ammo != 0) {
    fireRocket();
  }

  if (event.key == "a" || event.key == 'ф') {
    airfighter.isShipMovingLeft = true;
    if (airfighter.element.src != "img/Airfighter_ua_main_to_back.gif") {
      airfighter.element.src = "img/Airfighter_ua_main_to_back.gif";
    } 
  }

  if (event.key == "s" || event.key == 'ы' || event.key == 'і') {
    airfighter.isShipMovingDown = true;
    if (airfighter.element.src != "img/Airfighter_ua_main_to_down.gif") {
      airfighter.element.src = "img/Airfighter_ua_main_to_down.gif";
    }
  }

  if (event.key == "w" || event.key == 'ц') {
    airfighter.isShipMovingUp = true;
    if (airfighter.element.src != "img/Airfighter_ua_main_to_up.gif") {
      airfighter.element.src = "img/Airfighter_ua_main_to_up.gif";
    }
  }

  if (event.key == "d" || event.key == 'в') {
    airfighter.isShipMovingRight = true;
    if (airfighter.element.src != "img/Airfighter_ua_moveforvard.gif") {
      airfighter.element.src = "img/Airfighter_ua_moveforvard.gif";
    }
  }

  if (event.key == "p" || event.key == 'з') {
    gamePauseAction();
  }
}

function handleKeyUp (event) {
  if (event.key == "a" || event.key == 'ф') {
    airfighter.isShipMovingLeft = false;
    airfighter.element.src = "img/Airfighter_ua_back_to_main.gif";
  }

  if (event.key == "s" || event.key == 'ы' || event.key == 'і') {
    airfighter.isShipMovingDown = false;
    airfighter.element.src = "img/Airfighter_ua_down_to_main.gif";
  }
  
  if (event.key == "w" || event.key == 'ц') {
    airfighter.isShipMovingUp = false;
    airfighter.element.src = "img/Airfighter_ua_up_to_main.gif";
  }

  if (event.key == "d" || event.key == 'в') {
    airfighter.isShipMovingRight = false;
    airfighter.element.src = "img/Airfighter_ua_main.gif";
  }
}

function fireRocket() {
  if (rocket.velocity < 8) {
    rocket.velocity += 8;
    rocket.ammo -= 1;
    rocket.element.src = "img/Rocket.gif";
    setTimeout(preRocket, 8);
    soundRocketShot.play();
  }
}

function preRocket() {
  rocket.element.src = "img/preRocket.gif";
}

function handleStartGameBtnClick() {
  soundIntro.play();
  hideStartScreen();
}

function hideStartScreen() {
  let startScreen = document.querySelector("#start-screen");
  startScreen.remove();
}



function endGameAction () {
  document.location.reload();
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

function gamePauseAction () {
  if (isGamePaused) {
    unPauseGame();
  } else {
    pauseGame();
  }
}

const pauseScreen = document.querySelector("#pause-screen");

function unPauseGame () {
  gameFps = setInterval(Step, 1000/fps);
  pauseScreen.style.display = 'none';
  isGamePaused = false;
}
 
function pauseGame () {
  clearInterval(gameFps);
  pauseScreen.style.display = 'block';
  isGamePaused = true;
}
