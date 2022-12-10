let enemy1X = 600;
let enemy2X = 1600;
let enemy1Y = 81;
let enemy2Y = 81;
let shipX = 0;
let shipY = 0;
let rocketX = 20;
let rocketY = 70;
let rocketVelocity = 0;
let enemy1Velocity = -2;
let enemy2Velocity = -2;
let ship = document.querySelector("#airfighter");
let rocket = document.querySelector("#rocket");
let enemy1 = document.querySelector("#enemy1");
let enemy2 = document.querySelector("#enemy2");
const fps = 60;

function init() {
  console.log("init");
  setInterval(Step, 1000 / fps);
  initKeybordMovement();
}

function Step() {
  renderEnemy1();
  renderEnemy2();
  moveEnemy1();
  moveEnemy2();
  moveRocket();
  checkEnemy1ShipCollision();
  checkEnemy2ShipCollision();
  checkEnemy1RocketCollision();
  checkEnemy2RocketCollision();
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

function checkEnemy1ShipCollision() {
  console.log(enemy1X, shipX);
  if (
    shipX + 250 > enemy1X &&
    shipX < enemy1X + 361 &&
    shipY + 80 > enemy1Y &&
    shipY < enemy1Y + 200
  ) {
    alert("Game Over!");
  }
}

function checkEnemy2ShipCollision() {
  console.log(enemy2X, shipX);
  if (
    shipX + 250 > enemy2X &&
    shipX < enemy2X + 361 &&
    shipY + 80 > enemy2Y &&
    shipY < enemy2Y + 200
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
    console.log("rocketenemy1Collision");
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
function moveEnemy1() {
  enemy1X += enemy1Velocity;
}

function moveEnemy2() {
  enemy2X += enemy2Velocity;
}

init();
