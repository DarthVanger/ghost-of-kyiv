const enemyWidth = 361;
const enemyHeight = 200;
const shipHeight = 80;
let enemy1 = {
  x: 600,
  y: 81,
  width: 361,
  height: 200,
  element: document.querySelector("#enemy1"),
};

let enemy2 = {
  x: 1600,
  y: 81,
  width: 361,
  height: 200,
  element: document.querySelector("#enemy2"),
};

let enemy3 = {
  x: 2600,
  y: 281,
  width: 361,
  height: 200,
  element: document.querySelector("#enemy3"),
};

let airfighter = {
  x: 0,
  y: 0,
  width: 250,
  height: 80,
  element: document.querySelector('#airfighter'),
};

let enemy2X = 1600;
let enemy3X = 2600;
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
const fps = 60;

function startGame() {
  setInterval(Step, 1000 / fps);
  initKeybordMovement();
}

function Step() {
  renderEnemy(enemy1);
  renderEnemy(enemy2);
  renderEnemy(enemy3);
  enemy1.x = moveEnemy(enemy1.x, enemy1Velocity);
  enemy2.x = moveEnemy(enemy2.x, enemy2Velocity);
  enemy3.x = moveEnemy(enemy3.x, enemy3Velocity);
  moveRocket();
  checkEnemyShipCollision(enemy1);
  checkEnemyShipCollision(enemy2);
  checkEnemyShipCollision(enemy3);
  if (checkEnemyRocketCollision(enemy1.x, enemy1.y)) {
    enemy1.y += 800;
  }
  if (checkEnemyRocketCollision(enemy2.x, enemy2.y)) {
    enemy2.y += 800;
  }
  if (checkEnemyRocketCollision(enemy3.x, enemy3.y)) {
    enemy3.y += 800;
  }
  renderRocket();
  renderShip();
}

function renderEnemy (shitEnemy) {
  shitEnemy.element.style.left = shitEnemy.x;
  shitEnemy.element.style.top = shitEnemy.y;
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

function checkEnemyShipCollision(enemy) {
  if (
    shipX + airfighter.width > enemy.x &&
    shipX < enemy.x + enemy.width &&
    shipY + shipHeight > enemy.y &&
    shipY < enemy.y + enemy.height
  ) {
    alert("Game Over!");
  }
}

function checkEnemyRocketCollision(enemyX, enemyY) {
  if (
    rocketX > enemyX &&
    rocketY > enemyY &&
    rocketX < enemyX + enemyWidth &&
    rocketY < enemyY + enemyHeight
  ) {
    return true;
  }
}

/**
 * Bind all game keyboard controls
 */
function handleKeyDown(event) {
  console.log (event.key);
  if (event.key == "r" || event.key == 'к') {
    fireRocket();
  }

  if (event.key == "a" || event.key == 'ф') {
    moveShipLeft();
  }

  if (event.key == "s" || event.key == 'ы' || event.key == 'і') {
    moveShipDown();
  }

  if (event.key == "w" || event.key == 'ц') {
    moveShipUp();
  }

  if (event.key == "d" || event.key == 'в') {
    moveShipRight();
  }
}

function moveShipLeft() {
  shipX -= 10;
  if (rocketVelocity < 7) {
    rocketX -= 10;
  }
  console.log("moveShipLeft");
}

function moveShipRight() {
  shipX += 10;
  if (rocketVelocity < 7) {
    rocketX += 10;
  }
  console.log("moveShipRight");
}

function moveShipUp() {
  shipY -= 10;
  if (rocketVelocity < 7) {
    rocketY -= 10;
  }
  console.log("moveShipUp");
}

function moveShipDown() {
  shipY += 10;
  if (rocketVelocity < 7) {
    rocketY += 10;
  }
  console.log("moveShipDown");
}

/**
 * Launch rocket
 */
function fireRocket() {
  rocketVelocity += 8;
  rocket.src = "Rocket.gif";
  setTimeout(preRocket, 8);
}

function preRocket() {
  rocket.src = "preRocket.gif";
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
