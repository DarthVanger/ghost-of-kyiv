const enemyWidth = 360;
const enemyHeight = 200;
let enemy1 = {
  x: 800,
  y: 300,
  width: 360,
  height: 200,
  element: document.querySelector("#enemy1"),
};

let enemy2 = {
  x: 1600,
  y: 100,
  width: 360,
  height: 200,
  element: document.querySelector("#enemy2"),
};

let enemy3 = {
  x: 2100,
  y: 500,
  width: 360,
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

let bullet = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  element: document.querySelector('#bullet'),
  velocityX: 0,
  velocityY: 0,
  rotation: 0,
};

let enemyHealth1 = {
  x: 800,
  y: 300,
  width: 360,
  height: 10,
  element: document.querySelector('#healthBar1'),
};

let enemyHealth2 = {
  x: 1600,
  y: 100,
  width: 360,
  height: 10,
  element: document.querySelector('#healthBar2'),
};

let enemyHealth3 = {
  x: 2100,
  y: 500,
  width: 360,
  height: 10,
  element: document.querySelector('#healthBar3'),
};

let rocketX = 5;
let rocketY = 67;
let rocketVelocity = 0;
let enemy1Velocity = -2;
let enemy2Velocity = -2;
let enemy3Velocity = -2;
let enemyHealth1Velocity = -2;
let enemyHealth2Velocity = -2;
let enemyHealth3Velocity = -2;
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
  renderEnemy(enemyHealth1);
  renderEnemy(enemyHealth2);
  renderEnemy(enemyHealth3);
  renderBullet (bullet);
  enemy1.x = moveEnemy(enemy1.x, enemy1Velocity);
  enemy2.x = moveEnemy(enemy2.x, enemy2Velocity);
  enemy3.x = moveEnemy(enemy3.x, enemy3Velocity);
  enemyHealth1.x = moveEnemy(enemyHealth1.x, enemyHealth1Velocity);
  enemyHealth2.x = moveEnemy(enemyHealth2.x, enemyHealth2Velocity);
  enemyHealth3.x = moveEnemy(enemyHealth3.x, enemyHealth3Velocity);
  bullet.x += bullet.velocityX;
  bullet.y += bullet.velocityY;
  moveRocket();
  checkEnemyShipCollision(enemy1);
  checkEnemyShipCollision(enemy2);
  checkEnemyShipCollision(enemy3);
  if (checkEnemyRocketCollision(enemy1.x, enemy1.y)) {
    healthBar1.value -= 4;
    if (healthBar1.value === 0) {
      enemy1.y += 9999;
      enemyHealth1.y +=9999;
    }
  }
  if (checkEnemyRocketCollision(enemy2.x, enemy2.y)) {
    healthBar2.value -= 4;
    if (healthBar2.value === 0) {
      enemy2.y += 9999;
      enemyHealth2.y +=9999;
    }
  }
  if (checkEnemyRocketCollision(enemy3.x, enemy3.y)) {
    healthBar3.value -= 4;
    if (healthBar3.value === 0) {
      enemy3.y += 9999;
      enemyHealth3.y +=9999;
    }
  }
  renderRocket();
  renderShip();
}

function renderEnemy (shitEnemy) {
  shitEnemy.element.style.left = shitEnemy.x;
  shitEnemy.element.style.top = shitEnemy.y;
}

function renderBullet (shitBullet) {
  shitBullet.element.style.left = shitBullet.x;
  shitBullet.element.style.top = shitBullet.y;
  shitBullet.element.style.transform = `rotate(${shitBullet.rotation}rad)`;
}

/**
 * Update rocket img coordinates according to variables
 */
function renderRocket() {
  rocket.style.left = rocketX;
  rocket.style.top = rocketY;
}

function renderShip() {
  airfighter.element.style.left = airfighter.x;
  airfighter.element.style.top = airfighter.y;
}

function initKeybordMovement() {
  document.addEventListener("keydown", handleKeyDown);
}

function checkEnemyShipCollision(enemy) {
  if (
    airfighter.x + airfighter.width > enemy.x &&
    airfighter.x < enemy.x + enemy.width &&
    airfighter.y + airfighter.height > enemy.y &&
    airfighter.y < enemy.y + enemy.height
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
    fireBullet();
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
  airfighter.x -= 10;
  if (rocketVelocity < 7) {
    rocketX -= 10;
  }
  console.log("moveShipLeft");
}

function moveShipRight() {
  airfighter.x += 10;
  if (rocketVelocity < 7) {
    rocketX += 10;
  }
  console.log("moveShipRight");
}

function moveShipUp() {
  airfighter.y -= 10;
  if (rocketVelocity < 7) {
    rocketY -= 10;
  }
  console.log("moveShipUp");
}

function moveShipDown() {
  airfighter.y += 10;
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

function fireBullet() {
  bullet.velocityX += airfighter.x / Math.hypot(airfighter.x, airfighter.y) * 10;
  bullet.velocityY += airfighter.y / Math.hypot(airfighter.x, airfighter.y) * 10;
  bullet.rotation += Math.PI / 2 - Math.atan(airfighter.x / airfighter.y);
  console.log((Math.PI / 2 - Math.atan(airfighter.x / airfighter.y ))*180 / Math.PI);
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
