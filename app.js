let enemy1X = 600;
let enemy2X = 1600;
let enemy3X = 2600;
let enemy1Y = 81;
let enemy2Y = 81;
let enemy3Y = 281;
let shipX = 0;
let shipY = 0;
let rocketX = 20;
let rocketY = 70;
let rocketVelocity = 0;
let enemy1Velocity = -2;
let enemy2Velocity = -2;
let enemy3Velocity = -2;
let ship = document.querySelector("#airfighter");
let rocket = document.querySelector("#rocket");
let enemy1 = document.querySelector("#enemy1");
let enemy2 = document.querySelector("#enemy2");
let enemy3 = document.querySelector("#enemy3");
const fps = 60;

function startGame() {
  setInterval(Step , 1000/fps);
  initKeybordMovement();
 }

function Step() {
  renderEnemy1();
  renderEnemy2();
  renderEnemy3();
  enemy1X = moveEnemy(enemy1X,enemy1Velocity);
  enemy2X = moveEnemy(enemy2X,enemy2Velocity);
  enemy3X = moveEnemy(enemy3X,enemy3Velocity);
  moveRocket();
  checkEnemyShipCollision(enemy1X, enemy1Y);
  checkEnemyShipCollision(enemy2X, enemy2Y);
  checkEnemyShipCollision(enemy3X, enemy3Y);
  if (checkEnemyRocketCollision(enemy1X, enemy1Y)) {
    enemy1Y += 800;
  }
  if (checkEnemyRocketCollision(enemy2X, enemy2Y)) {
    enemy2Y += 800;
  }
  if (checkEnemyRocketCollision(enemy3X, enemy3Y)) {
    enemy3Y += 800;
  }
  renderRocket();
  renderShip();
}

function renderEnemy1() {
  enemy1.style.left = enemy1X;
  enemy1.style.top = enemy1Y;
}

function renderEnemy2() {
  enemy2.style.left = enemy2X;
  enemy2.style.top = enemy2Y;
}

function renderEnemy3() {
  enemy3.style.left = enemy3X;
  enemy3.style.top = enemy3Y;
}

/**
 * Update rocket img coordinates according to variables
 */
function renderRocket() {
  rocket.style.left = rocketX;
  rocket.style.top = rocketY;
}

function renderShip() {
  ship.style.left = shipX;
  ship.style.top = shipY;
}

function initKeybordMovement() {
  document.addEventListener("keydown", handleKeyDown);
}

function checkEnemyShipCollision(enemyX, enemyY) {
  if (
    shipX + 250 > enemyX &&
    shipX < enemyX + 361 &&
    shipY + 80 > enemyY &&
    shipY < enemyY + 200
  ) {
    alert("Game Over!");
  }
}

function checkEnemyRocketCollision(enemyX, enemyY) {
  if (
    rocketX > enemyX &&
    rocketY > enemyY &&
    rocketX < enemyX + 361 &&
    rocketY < enemyY + 200
  ) {
    return true;
  }
}

/**
 * Bind all game keyboard controls
 */
function handleKeyDown(event) {
  if (event.key == "r") {
    fireRocket();
  }

  if (event.key == "a") {
    moveShipLeft();
  }

  if (event.key == "s") {
    moveShipDown();
  }

  if (event.key == "w") {
    moveShipUp();
  }

  if (event.key == "d") {
    moveShipRight();
  }
}

function moveShipLeft() {
  shipX -= 10;
  rocketX -= 10;
}

function moveShipRight() {
  shipX += 10;
  rocketX += 10;
}

function moveShipUp() {
  shipY -= 10;
  rocketY -= 10;
}

function moveShipDown() {
  shipY += 10;
  rocketY += 10; 
}

/**
 * Launch rocket
 */
function fireRocket() { 
  rocketVelocity += 8;
  rocket.src="Rocket.gif";
  setTimeout(preRocket, 8);
}

function preRocket () {
  rocket.src="preRocket.gif";
}

/**
 * Change coordinates of rocket according to rocket velocity
 */
function moveRocket() {
  rocketX += rocketVelocity;
}

/**
 * Change coordinates of enemy1 according to enemy1 velocity
 */


function moveEnemy(enemyx,enemyVelocity) {
  return enemyx += enemyVelocity;
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