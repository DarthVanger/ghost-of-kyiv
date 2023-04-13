import {fireGatlingEnemy, gatling, enemyDies} from "./gatling.js";
import {airfighter} from "./airfighter.js";
import {enemies} from './enemy.js';
import {soundRocketShot, soundRocketHit, soundEnemyDieExplosion, soundGameOver, soundMainTheme, soundLevelComplete, soundIntro} from "./music.js";

const fps = 60;
let gameFps;
let isGameStarted = false;
let isGamePaused = false;

let mobileControls = {
  leftButton: document.querySelector('.left'),
  topButton: document.querySelector('.top'),
  bottomButton: document.querySelector('.bottom'),
  rightButton: document.querySelector('.right'),
  fireButton: document.querySelector('.fire'),
}

let rocket = {
  x: 5,
  y: 67,
  width: 120,
  ammo: 10,
  dmg: 50,
  velocity: 0,
  element: document.querySelector("#rocket"),
}

function startGame() {
  initKeybordMovement();
  enemies.forEach(addGatling);
  gameFps = setInterval(Step, 1000 / fps);
}

function addGatling (enemy) {
  function handleEnemyClick (event) {
    fireGatlingEnemy(event, enemy);
  }    
  enemy.element.addEventListener('click', handleEnemyClick);
}

function Step () {
  enemies.forEach(renderEnemy);
  enemies.forEach(moveEnemy);
  ammoElement.innerHTML = `<img class="ammoImg" src="img/ammo-gatling-img.gif"> ${gatling.ammo} <br> <img class="ammoImg" src="img/ammo-rocket-img.gif"> ${rocket.ammo}`;
  moveRocket();
  enemies.forEach(checkEnemyShipCollision);
  enemies.forEach(collisionSHmolision);
  function collisionSHmolision (enemy) {
    if (checkEnemyRocketCollision(enemy)) {
      enemy.enemyHealth.element.value -= rocket.dmg;
      rocket.dmg -= rocket.dmg;
      soundRocketHit.play();
    }

    if (enemy.enemyHealth.element.value <= 0  && enemy.isAlive) {
      enemy.isAlive = false;
      enemy.x -= enemyDies;
      soundEnemyDieExplosion.play();
    }

    if (rocket.dmg <= 0) {
      rocket.x = airfighter.x + airfighter.rocketDefaultX;
      rocket.y = airfighter.y + airfighter.rocketDefaultY;
      rocket.velocity -= 8;
      rocket.dmg = 50;
      rocket.element.src = "img/Rocket.gif";
    }
  }
  
  if (rocket.x > airfighter.x + airfighter.rocketMaxDistance) {
    rocket.x = airfighter.x + airfighter.rocketDefaultX;
    rocket.y = airfighter.y + airfighter.rocketDefaultY;
    rocket.velocity -= 8;
    rocket.dmg = 50;
    rocket.element.src = "img/Rocket.gif";
  }
  
  renderRocket();
  renderShip();

  if (airfighter.isShipMovingUp) {
    moveShipUp();
  }
  if (airfighter.isShipMovingDown) {
    moveShipDown();
  }
  if (airfighter.isShipMovingLeft) {
    moveShipLeft();
  }
  if (airfighter.isShipMovingRight) {
    moveShipRight();
  }
  if (enemies[enemies.length-1].x < 0 - enemies[enemies.length-1].width) {
    clearInterval(gameFps);
    document.querySelector('#levelComplete').style.display = '';
    fadeIn(levelComplete, 400);
    soundMainTheme.pause();
    soundMainTheme.currentTime = 0;
    soundLevelComplete.play();
    soundLevelComplete.volume = 0.4;
  }
}

function renderEnemy (enemy) {
  enemy.enemyHealth.element.style.left = enemy.x;
  enemy.enemyHealth.element.style.top = enemy.y - 20;
  enemy.enemyHealth.element.style.width = enemy.width;
  enemy.enemyHealth.element.style.height = enemy.height*0.1;
  enemy.enemyHealthText.element.value = enemy.enemyHealth.element.value / enemy.enemyHealth.element.max
  enemy.enemyHealthText.element.innerHTML = `${enemy.enemyHealth.element.value} / ${enemy.enemyHealth.element.max} HP`;
  enemy.enemyHealthText.element.style.left = enemy.x;
  enemy.enemyHealthText.element.style.top = enemy.y - 35;
  enemy.enemyHealthText.element.style.width = enemy.width;
  enemy.element.style.left = enemy.x;
  enemy.element.style.top = enemy.y;
  enemy.element.style.width = enemy.width;
  enemy.element.style.height = enemy.height;
}

function renderRocket() {
  rocket.element.style.left = rocket.x;
  rocket.element.style.top = rocket.y;
}

function renderShip() {
  airfighter.element.style.left = airfighter.x;
  airfighter.element.style.top = airfighter.y;
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

function checkEnemyShipCollision(enemy) {
  if (
    airfighter.x + airfighter.width > enemy.x &&
    airfighter.x < enemy.x + enemy.width &&
    airfighter.y + airfighter.height > enemy.y &&
    airfighter.y < enemy.y + enemy.height
  ) {
    document.querySelector('#gameover-screen').style.display = '';
    airfighter.x = 0;
    airfighter.y = 0;
    soundRocketHit.pause();
    soundEnemyDieExplosion.play();
    setTimeout(function() {
      soundMainTheme.pause();
      soundGameOver.play();
    }, 900);
    
    }
}

function checkEnemyRocketCollision(enemy) {
  if (
    rocket.x > enemy.x &&
    rocket.y > enemy.y &&
    rocket.x < enemy.x + enemy.width &&
    rocket.y < enemy.y + enemy.height
  ) {
    soundRocketShot.pause();
    soundRocketShot.currentTime = 0;
    return true;
  }
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

function moveShipLeft() {
  if (airfighter.x > 0) {
    airfighter.x -= 3;
    if (rocket.velocity < 7) {
      rocket.x -= 3;
    }
  }
}

function moveShipRight() {
  if (airfighter.x + airfighter.width < screen.width) {
    airfighter.x += 10;
    if (rocket.velocity < 7) {
      rocket.x += 10;
    }
  }
}

function moveShipUp() {
  if (airfighter.y > 0) {
    airfighter.y -= 10;
    if (rocket.velocity < 7) {
      rocket.y -= 10;
    }
  }
}

function moveShipDown() {
  if (airfighter.y + airfighter.height > window.innerHeight-50 ) {
    document.querySelector('#gameover-screen').style.display = '';
    airfighter.x = 0;
    airfighter.y = 0;
    soundRocketHit.pause();
    soundEnemyDieExplosion.play();
    setTimeout (function() {
      soundMainTheme.pause();
      soundGameOver.play();
    }, 900);
  }
  airfighter.y += 10;
  if (rocket.velocity < 7) {
    rocket.y += 10;
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

function moveRocket() {
  rocket.x += rocket.velocity;
}

function moveEnemy(enemy) {
  return (enemy.x += enemy.velocity);
}

function handleStartGameBtnClick() {
  soundIntro.play();
  hideStartScreen();
}

function hideStartScreen() {
  let startScreen = document.querySelector("#start-screen");
  startScreen.remove();
}

function fadeIn(element, duration) {
  element.style.opacity = 0;
  var last = +new Date();
  var tick = function() {
    element.style.opacity = +element.style.opacity + (new Date() - last) / duration;
    last = +new Date();
    if (+element.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };
  tick();
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