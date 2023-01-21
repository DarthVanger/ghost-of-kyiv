const enemyWidth = 361;
const enemyHeight = 200;
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

let isShipMovingUp = false;
let isShipMovingLeft = false;
let isShipMovingRight = false;
let isShipMovingDown = false;
let enemy2X = 1600;
let enemy3X = 2600;
let enemy2Y = 81;
let enemy3Y = 281;
let rocketX = 20;
let rocketY = 70;
let rocketVelocity = 0;
let enemy1Velocity = -2;
let enemy2Velocity = -2;
let enemy3Velocity = -2;
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
  renderBullet (bullet);
  enemy1.x = moveEnemy(enemy1.x, enemy1Velocity);
  enemy2.x = moveEnemy(enemy2.x, enemy2Velocity);
  enemy3.x = moveEnemy(enemy3.x, enemy3Velocity);
  bullet.x += bullet.velocityX;
  bullet.y += bullet.velocityY;
  moveRocket();
  checkEnemyShipCollision(enemy1);
  checkEnemyShipCollision(enemy2);
  checkEnemyShipCollision(enemy3);
  if (checkEnemyRocketCollision(enemy1.x, enemy1.y)) {
    enemy1.x = -2000;
  }
  if (checkEnemyRocketCollision(enemy2.x, enemy2.y)) {
    enemy2.x = -2000;
  }
  if (checkEnemyRocketCollision(enemy3.x, enemy3.y)) {
    enemy3.x = -2000;
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
  document.addEventListener("keyup", handleKeyUp);
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
  if (event.key == "r" || event.key == 'к' || event.key == ' ') {
    fireRocket();
    fireBullet();
  }

  if (event.key == "a" || event.key == 'ф') {
    //moveShipLeft();
    isShipMovingLeft = true;
  }

  if (event.key == "s" || event.key == 'ы' || event.key == 'і') {
    //moveShipDown();
    isShipMovingDown = true;
  }

  if (event.key == "w" || event.key == 'ц') {
    //moveShipUp();
    isShipMovingUp = true;
  }

  if (event.key == "d" || event.key == 'в') {
    //moveShipRight();
    isShipMovingRight = true;
  }
}

function handleKeyUp (event) {

  if (event.key == "a" || event.key == 'ф') {
    //moveShipLeft();
    isShipMovingLeft = false;
  }

  if (event.key == "s" || event.key == 'ы' || event.key == 'і') {
    //moveShipDown();
    isShipMovingDown = false;
  }

  if (event.key == "w" || event.key == 'ц') {
    //moveShipUp();
    isShipMovingUp = false;
  }

  if (event.key == "d" || event.key == 'в') {
    //moveShipRight();
    isShipMovingRight = false;
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
  const airfighterCenter = { 
    x: airfighter.x + (airfighter.width/2), 
    y: airfighter.y + (airfighter.height/2),
  };
  const distanceToAirfighter = Math.hypot(airfighterCenter.x, airfighterCenter.y);
  const bulletSpeed = 10;
  const bulletAngle = Math.atan(airfighter.x / airfighter.y);
  bullet.velocityX += airfighterCenter.x / distanceToAirfighter * bulletSpeed;
  bullet.velocityY += airfighterCenter.y / distanceToAirfighter * bulletSpeed;
  bullet.rotation += Math.PI / 2 - bulletAngle;
  console.log((Math.PI / 2 - bulletAngle )*180 / Math.PI);
  console.log(bulletAngle);
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
