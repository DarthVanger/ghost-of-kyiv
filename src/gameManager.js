import { mobileControls } from './touch.js';
import { rocket } from './rocket.js';
import { airfighter } from "./airfighter.js";
import { deleteEnemies, createEnemies, enemies } from './enemy.js';
import { soundRocketShot, soundMainTheme, soundIntro, soundLevelComplete, soundboss } from "./music.js";
import { Step, gameState, fps } from './step.js';
import { fireGatlingEnemy } from './gatling.js';
import { resetAmmo } from './ammo.js';
import { level2boss, createBoss } from './Boss.js';
import { bossPopup } from './rendering/Helpers.js';


let isGameStarted = false;
let introduction = document.querySelector('#introduction');
introduction.addEventListener('click', introductionSkip);

const levelState = {
  isLevelFinished : false,
  levelNumber : 0,
}

export function startGame() {
  console.log(`startGame, level :${levelState.levelNumber}`);
  initKeybordMovement();
  if (levelState.levelNumber == 1) {
    startLevel1()
  }
  if (levelState.levelNumber == 2) {
    startLevel2()
  } 
  if (levelState.levelNumber == 3) {
    startLevel3()
  }
}

function changeLevel() { 
  isGameStarted = false
  soundLevelComplete.pause()
  document.querySelector('#levelComplete').addEventListener('click', (event) => {
    introduction.style.display = 'block'
    introduction.style.zIndex = levelState.levelNumber * 2
    soundMainTheme.play()
    if(levelState.levelNumber == 1) {
      document.querySelector('#episode').innerHTML = 'EPISODE II'
      document.querySelector('#preHistoryEpisode').innerHTML = 'The battle for the borders of Gostomel'

    }
    if(levelState.levelNumber == 2) {
      soundboss.play()
      soundboss.volume = 0.7;
      document.querySelector('#episode').innerHTML = 'EPISODE III'
      document.querySelector('#preHistoryEpisode').innerHTML = 'Helicopter Boss'
    }
    
  })
}

function introductionSkip() {
  if (!isGameStarted) {
    soundMainTheme.play();
    soundMainTheme.volume = 0.3;
    introduction.style.display = "none";
    introduction.style.zIndex = -1;
    soundIntro.pause();
    levelState.levelNumber += 1
    startGame();
    isGameStarted = true;
  } 
}

function startLevel1() {
  soundMainTheme.play()
	createEnemies(11)
  gameState.gameIntervalId = setInterval(Step, 1000 / fps);
  isGameStarted = false;
}

function startLevel2() {
  airfighter.moveToInitalPosition();
  airfighter.resetLife()
	rocket.moveToInitialPosition();
  clearInterval(gameState.gameIntervalId);
  isGameStarted = false;
  deleteEnemies();
  createEnemies(11)
  resetAmmo()
  gameState.gameIntervalId = setInterval(Step, 1000 / fps);
  document.querySelector('#levelComplete').style.display = 'none'
  introduction.style.display = "block";
}

function startLevel3() {
  airfighter.moveToInitalPosition();
  airfighter.resetLife()
	rocket.moveToInitialPosition();
  clearInterval(gameState.gameIntervalId);
  isGameStarted = false;
  deleteEnemies();
  bossPopup()
  createBoss()
  enemies.push(level2boss)
  resetAmmo()
  document.querySelector('#levelComplete').style.display = 'none'
  introduction.style.display = "block";
  gameState.gameIntervalId = setInterval(Step, 1000 / fps);
}

document.querySelector('#nextlevel').addEventListener('click', changeLevel)

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
  if ((event.key == "r" || event.key == 'к' ) && rocket.ammo != 0) {
    fireRocket();
  }

  if (event.key == "a" || event.key == 'ф') {
    airfighter.isShipMovingLeft = true;
    if (airfighter.element.src != "img/aifighter-Back.gif") {
      airfighter.element.src = "img/aifighter-Back.gif";
    } 
  }

  if (event.key == "s" || event.key == 'ы' || event.key == 'і') {
    airfighter.isShipMovingDown = true;
    if (airfighter.element.src != "img/aifighter-Down.gif") {
      airfighter.element.src = "img/aifighter-Down.gif";
    }
  }

  if (event.key == "w" || event.key == 'ц') {
    airfighter.isShipMovingUp = true;
    if (airfighter.element.src != "img/aifighter-Up.gif") {
      airfighter.element.src = "img/aifighter-Up.gif";
    }
  }

  if (event.key == "d" || event.key == 'в') {
    airfighter.isShipMovingRight = true;
    if (airfighter.element.src != "img/aifighter-Front-Accelerate.gif") {
      airfighter.element.src = "img/aifighter-Front-Accelerate.gif";
    }
  }

  if (event.key == "p" || event.key == 'з') {
    gamePauseAction();
  }
  if (event.key == " ") {
    fireGatlingEnemy();
  }
}
  
function handleKeyUp (event) {
  if (event.key == "a" || event.key == 'ф') {
    airfighter.isShipMovingLeft = false;
    airfighter.element.src = "img/aifighter-Front.gif";
  }

  if (event.key == "s" || event.key == 'ы' || event.key == 'і') {
    airfighter.isShipMovingDown = false;
    airfighter.element.src = "img/aifighter-Front.gif";
  }
  
  if (event.key == "w" || event.key == 'ц') {
    airfighter.isShipMovingUp = false;
    airfighter.element.src = "img/aifighter-Front.gif";
  }

  if (event.key == "d" || event.key == 'в') {
    airfighter.isShipMovingRight = false;
    airfighter.element.src = "img/aifighter-Front.gif";
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
  rocket.element.src = "img/mrRocket.gif";
}
  
export function endGameAction () {
  document.location.reload();
}

function gamePauseAction () {
  if (gameState.isGamePaused) {
    unPauseGame();
  } else {
    pauseGame();
  }
}

const pauseScreen = document.querySelector("#pause-screen");

function unPauseGame () {
  gameState.gameIntervalId = setInterval(Step, 1000/fps);
  pauseScreen.style.display = 'none';
  gameState.isGamePaused = false;
}
   
function pauseGame () {
  clearInterval(gameState.gameIntervalId);
  pauseScreen.style.display = 'block';
  gameState.isGamePaused = true;
}

  
