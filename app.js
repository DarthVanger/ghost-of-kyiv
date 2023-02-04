import {fireGatlingEnemyOne, fireGatlingEnemyTwo, fireGatlingEnemyThree, gatling, enemyDies} from "./gatling.js";
import {enemyHealth50, enemyHealth100, enemyHealth200, enemyHealth50text, enemyHealth100text, enemyHealth200text} from "./health.js";
import {airfighter} from "./airfighter.js";
import {enemy1, enemy2, enemy3} from './enemy.js';

const fps = 60;
const enemyWidth = 360;
const enemyHeight = 200;
const rocketDefaultX = 5;
const rocketDefaultY = 67;
const rocketMaxDistance = 1500;
let gameFps;
let isShipMovingUp = false;
let isShipMovingLeft = false;
let isShipMovingRight = false;
let isShipMovingDown = false;

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
  gatling.x = moveEnemy(gatling.x, gatling.velocity);
  moveRocket();
  checkEnemyShipCollision(enemy1);
  checkEnemyShipCollision(enemy2);
  checkEnemyShipCollision(enemy3);
  ammoElement.innerHTML = `Gatling Ammo: ${gatling.ammo} <br> Rocket Ammo: ${rocket.ammo}`;

  if (checkEnemyRocketCollision(enemy1)) {
    healthBar50.value -= rocket.dmg;
    rocket.dmg -= rocket.dmg;
    if (healthBar50.value <= 0) {
      enemy1.x -= enemyDies;
    }
    if (rocket.dmg <= 0) {
      rocket.x = airfighter.x + rocketDefaultX;
      rocket.y = airfighter.y + rocketDefaultY;
      rocket.velocity -= 8;
      rocket.dmg = rocket.dmg;
      rocket.element.src = "Rocket.gif";
    }
  }

  if (checkEnemyRocketCollision(enemy2)) {
    enemyHealth100.element.value -= rocket.dmg;
    rocket.dmg -= rocket.dmg;
    if (enemyHealth100.element.value <= 0) {
      enemy2.x -= enemyDies;
    }
    if (rocket.dmg <= 0) {
      rocket.x = airfighter.x + rocketDefaultX;
      rocket.y = airfighter.y + rocketDefaultY;
      rocket.velocity -= 8;
      rocket.dmg = 50;
      rocket.element.src = "Rocket.gif";
    }
  }

  if (checkEnemyRocketCollision(enemy3)) {
    healthBar200.value -= rocket.dmg;
    rocket.dmg -= rocket.dmg;
    if (healthBar200.value <= 0) {
      enemy3.x -= enemyDies;
    }
    if (rocket.dmg <= 0) {
      rocket.x = airfighter.x + rocketDefaultX;
      rocket.y = airfighter.y + rocketDefaultY;
      rocket.velocity -= 8;
      rocket.dmg = 50;
      rocket.element.src = "Rocket.gif";
    }
  }

  if (rocket.x > airfighter.x + rocketMaxDistance) {
    rocket.x = airfighter.x + rocketDefaultX;
    rocket.y = airfighter.y + rocketDefaultY;
    rocket.velocity -= 8;
    rocket.dmg = 50;
    rocket.element.src = "Rocket.gif";
  }
  
  renderRocket();
  renderShip();

  if (isShipMovingUp) {
    moveShipUp();
  }
  if (isShipMovingDown) {
    moveShipDown();
  }
  if (isShipMovingLeft) {
    moveShipLeft();
  }
  if (isShipMovingRight) {
    moveShipRight();
  }
  if (enemy3.x < 0 - enemy3.width) {
    clearInterval(gameFps);
    document.querySelector('#levelComplete').style.display = '';
    fadeIn(levelComplete, 400);
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
  mobileControls.leftButton.addEventListener('click' , moveShipLeft);
  mobileControls.rightButton.addEventListener('mousedown' , moveShipRight);
  mobileControls.topButton.addEventListener('mousedown' , moveShipUp);
  mobileControls.bottomButton.addEventListener('mousedown' , moveShipDown);
  mobileControls.fireButton.addEventListener('click' , fireRocket)
}

function checkEnemyShipCollision(enemy) {
  if (
    airfighter.x + airfighter.width > enemy.x &&
    airfighter.x < enemy.x + enemy.width &&
    airfighter.y + airfighter.height > enemy.y &&
    airfighter.y < enemy.y + enemy.height
  ) {
    //alert("Game Over!");
    document.body.innerHTML = "gameover";
  }
}

function checkEnemyRocketCollision(enemy) {
  if (
    rocket.x > enemy.x &&
    rocket.y > enemy.y &&
    rocket.x < enemy.x + enemy.width &&
    rocket.y < enemy.y + enemy.height
  ) {
    return true;
  }
}

function handleKeyDown(event) {
  console.log (event.key);
  if ((event.key == "r" || event.key == 'к' || event.key == ' ') && rocket.ammo != 0) {
    fireRocket();
  }

  if (event.key == "a" || event.key == 'ф') {
    isShipMovingLeft = true;
    if (airfighter.element.src != "Airfighter_ua_main_to_back.gif") {
      airfighter.element.src = "Airfighter_ua_main_to_back.gif";
    } 
  }

  if (event.key == "s" || event.key == 'ы' || event.key == 'і') {
    isShipMovingDown = true;
    if (airfighter.element.src != "Airfighter_ua_main_to_down.gif") {
      airfighter.element.src = "Airfighter_ua_main_to_down.gif";
    }
  }

  if (event.key == "w" || event.key == 'ц') {
    isShipMovingUp = true;
    if (airfighter.element.src != "Airfighter_ua_main_to_up.gif") {
      airfighter.element.src = "Airfighter_ua_main_to_up.gif";
    }
  }

  if (event.key == "d" || event.key == 'в') {
    isShipMovingRight = true;
    if (airfighter.element.src != "Airfighter_ua_moveforvard.gif") {
      airfighter.element.src = "Airfighter_ua_moveforvard.gif";
    }
  }

  if (event.key == "p" || event.key == 'з') {
    clearInterval(gameFps);
  }
}

function handleKeyUp (event) {
  if (event.key == "a" || event.key == 'ф') {
    isShipMovingLeft = false;
    airfighter.element.src = "Airfighter_ua_back_to_main.gif";
  }

  if (event.key == "s" || event.key == 'ы' || event.key == 'і') {
    isShipMovingDown = false;
    airfighter.element.src = "Airfighter_ua_down_to_main.gif";
  }

  if (event.key == "w" || event.key == 'ц') {
    isShipMovingUp = false;
    airfighter.element.src = "Airfighter_ua_up_to_main.gif";
  }

  if (event.key == "d" || event.key == 'в') {
    isShipMovingRight = false;
    airfighter.element.src = "Airfighter_ua_main.gif";
  }
}

function moveShipLeft() {
  airfighter.x -= 10;
  if (rocket.velocity < 7) {
    rocket.x -= 10;
  }
  console.log("moveShipLeft");
}

function moveShipRight() {
  airfighter.x += 10;
  if (rocket.velocity < 7) {
    rocket.x += 10;
  }
  console.log("moveShipRight");
}

function moveShipUp() {
  airfighter.y -= 10;
  if (rocket.velocity < 7) {
    rocket.y -= 10;
  }
  console.log("moveShipUp");
}

function moveShipDown() {
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
    rocket.element.src = "Rocket.gif";
    setTimeout(preRocket, 8);
  }
}


function preRocket() {
  rocket.element.src = "preRocket.gif";
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
  startGame();
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
const startGameButton = document.querySelector("#startGameButton");
startGameButton.addEventListener("click", handleStartGameBtnClick);
