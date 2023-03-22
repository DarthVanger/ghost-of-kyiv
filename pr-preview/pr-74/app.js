import {fireGatlingEnemyOne, fireGatlingEnemyTwo, fireGatlingEnemyThree, gatling, enemyDies} from "./gatling.js";
import {enemyHealth50, enemyHealth100, enemyHealth200, enemyHealth50text, enemyHealth100text, enemyHealth200text} from "./health.js";
import {airfighter} from "./airfighter.js";
import {enemy1, enemy2, enemy3} from './enemy.js';
import { soundRocketShot, soundRocketHit, soundEnemyDieExplosion, soundGameOver, soundMainTheme, soundLevelComplete, soundIntro} from "./music.js";

const fps = 60;
let gameFps;

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
  ammo: 5,
  dmg: 50,
  velocity: 0,
  element: document.querySelector("#rocket"),
}
  let lvlComplete = {
    element: document.querySelector('#levelComplete')
  }

function startGame() {
  initKeybordMovement();
  enemy1.element.addEventListener('click', fireGatlingEnemyOne);
  enemy2.element.addEventListener('click', fireGatlingEnemyTwo);
  enemy3.element.addEventListener('click', fireGatlingEnemyThree);
  gameFps = setInterval(Step, 1000 / fps);
}

function Step() {
  renderEnemy(enemyHealth50text, healthBar50text, enemyHealth50, healthBar50, enemy1);
  renderEnemy(enemyHealth100text, healthBar100text, enemyHealth100, enemyHealth100.element, enemy2);
  renderEnemy(enemyHealth200text, healthBar200text, enemyHealth200, healthBar200, enemy3);
  enemy1.x = moveEnemy(enemy1.x, enemy1.velocity);
  enemy2.x = moveEnemy(enemy2.x, enemy2.velocity);
  enemy3.x = moveEnemy(enemy3.x, enemy3.velocity);
  enemyHealth50.x = moveEnemy(enemyHealth50.x, enemyHealth50.velocity);
  enemyHealth100.x = moveEnemy(enemyHealth100.x, enemyHealth100.velocity);
  enemyHealth200.x = moveEnemy(enemyHealth200.x, enemyHealth200.velocity);
  enemyHealth50text.x = moveEnemy(enemyHealth50text.x, enemyHealth50text.velocity);
  enemyHealth100text.x = moveEnemy(enemyHealth100text.x, enemyHealth100text.velocity);
  enemyHealth200text.x = moveEnemy(enemyHealth200text.x, enemyHealth200text.velocity);
  ammoElement.innerHTML = `Gatling Ammo: ${gatling.ammo} <br> Rocket Ammo: ${rocket.ammo}`;
  moveRocket();
  checkEnemyShipCollision(enemy1);
  checkEnemyShipCollision(enemy2);
  checkEnemyShipCollision(enemy3);
  

  if (checkEnemyRocketCollision(enemy1)) {
    healthBar50.value -= rocket.dmg;
    rocket.dmg -= rocket.dmg;
    if (healthBar50.value <= 0) {
      enemy1.x -= enemyDies;
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

  if (checkEnemyRocketCollision(enemy2)) {
    enemyHealth100.element.value -= rocket.dmg;
    rocket.dmg -= rocket.dmg;
    soundRocketHit.play();
    if (enemyHealth100.element.value <= 0) {
      enemy2.x -= enemyDies;
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

  if (checkEnemyRocketCollision(enemy3)) {
    healthBar200.value -= rocket.dmg;
    rocket.dmg -= rocket.dmg;
    soundRocketHit.play();
    if (healthBar200.value <= 0) {
      enemy3.x -= enemyDies;
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
  if (enemy3.x < 0 - enemy3.width) {
    clearInterval(gameFps);
    document.querySelector('#levelComplete').style.display = '';
    fadeIn(levelComplete, 400);
    soundMainTheme.pause();
    soundMainTheme.currentTime = 0;
    soundLevelComplete.play();
    soundLevelComplete.volume = 0.4;
  }
}

function renderEnemy (text, textValue, health, healthValue, enemy) {
  health.element.style.left = enemy.x;
  health.element.style.top = enemy.y - 20;
  health.element.style.width = enemy.width;
  health.element.style.height = enemy.height*0.1;
  textValue.value = healthValue.value / healthValue.max;
  textValue.innerHTML = `${healthValue.value} / ${healthValue.max} HP`;
  text.element.style.left = enemy.x;
  text.element.style.top = enemy.y - 35;
  text.element.style.width = enemy.width;
  enemy.element.style.left = enemy.x;
  enemy.element.style.top = enemy.y;
}

/**
 * Update rocket img coordinates according to variables
 */
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
    //alert("Game Over!");
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
  console.log (event.key);
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
    clearInterval(gameFps);
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
    airfighter.x -= 10;
    if (rocket.velocity < 7) {
      rocket.x -= 10;
    }
  console.log("moveShipLeft");
  }
}

function moveShipRight() {
  if (airfighter.x + airfighter.width < screen.width) {
    airfighter.x += 10;
    if (rocket.velocity < 7) {
      rocket.x += 10;
    }
  console.log("moveShipRight");
  }
}

function moveShipUp() {
  if (airfighter.y > 0) {
    airfighter.y -= 10;
    if (rocket.velocity < 7) {
      rocket.y -= 10;
    }
  console.log("moveShipUp");
  }
}

function moveShipDown() {
  if (airfighter.y + airfighter.height > screen.height - 200) {
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
  console.log("moveShipDown");
}

/**
 * Launch rocket
 */
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

/**
 * Change coordinates of rocket according to rocket velocity
 */
function moveRocket() {
  rocket.x += rocket.velocity;
}

/**
 * Change coordinates of enemy1 according to enemy1 velocity
 */

function moveEnemy(enemyx, enemyVelocity) {
  return (enemyx += enemyVelocity);
}

/**
 * On start screen button click actions
 */
function handleStartGameBtnClick() {
  soundIntro.play();
  hideStartScreen();
}

/**
 * Remove div of start button screen
 */
function hideStartScreen() {
  let startScreen = document.querySelector("#start-screen");
  startScreen.remove();

}

function fadeIn(element, duration) {
  element.style.display = '';
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
window.addEventListener('load', function (){setTimeout(introductionSkip, 44000)});
function introductionSkip(){
    startGame();
    soundMainTheme.play();
    soundMainTheme.volume = 0.3;
    introduction.remove();
    introduction.style.zIndex = 1;
  soundIntro.pause();
  }
introduction.addEventListener('click', introductionSkip);