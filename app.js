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

function init() {
  console.log("init");
  setInterval(Step, 1000 / fps);
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
  checkEnemy1RocketCollision();
  checkEnemy2RocketCollision();
  checkEnemy3RocketCollision();
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
  console.log("initKeybordMovement");
  document.addEventListener("keydown", handleKeyDown);
}

function checkEnemyShipCollision(enemyX, enemyY) {
  console.log(enemyX, shipX);
  if (
    shipX + 250 > enemyX &&
    shipX < enemyX + 361 &&
    shipY + 80 > enemyY &&
    shipY < enemyY + 200
  ) {
    alert("Game Over!");
  }
}

function checkEnemy1RocketCollision() {
  if (
    rocketX > enemy1X &&
    rocketY > enemy1Y &&
    rocketX < enemy1X + 361 &&
    rocketY < enemy1Y + 200
  ) {
    enemy1Y += 800;
    console.log("rocketenemy1Collision");
  }
}

function checkEnemy2RocketCollision() {
  if (
    rocketX > enemy2X &&
    rocketY > enemy2Y &&
    rocketX < enemy2X + 361 &&
    rocketY < enemy2Y + 200
  ) {
    enemy2Y += 800;
    console.log("rocketenemy2Collision");
  }
}

function checkEnemy3RocketCollision() {
  if (
    rocketX > enemy3X &&
    rocketY > enemy3Y &&
    rocketX < enemy3X + 361 &&
    rocketY < enemy3Y + 200
  ) {
    enemy3Y += 800;
    console.log("rocketenemy3Collision");
  }
}

/**
 * Bind all game keyboard controls
 */
function handleKeyDown(event) {
  console.log("handleKeyDown");
  console.log("key: ", event.key);
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
  console.log("moveShipLeft");
}

function moveShipRight() {
  shipX += 10;
  rocketX += 10;
  console.log("moveShipRight");
}

function moveShipUp() {
  shipY -= 10;
  rocketY -= 10;
  console.log("moveShipUp");
}

function moveShipDown() {
  shipY += 10;
  rocketY += 10;
  console.log("moveShipDown");
}

/**
 * Launch rocket
 */
function fireRocket() {
  console.log("fireRocket");
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


init();
