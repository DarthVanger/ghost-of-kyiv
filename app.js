const enemyWidth = 360;
const enemyHeight = 200;
let enemy1 = {
  x: 800,
  y: 100,
  width: 360,
  height: 200,
  element: document.querySelector("#enemy1"),
};

let enemy2 = {
  x: 1400,
  y: 350,
  width: 360,
  height: 200,
  element: document.querySelector("#enemy2"),
};

let enemy3 = {
  x: 1900,
  y: 250,
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

let enemyHealth50 = {
  element: document.querySelector('#healthBar50')};
let enemyHealth100 = {
  element: document.querySelector('#healthBar100')};
let enemyHealth200 = {
  element: document.querySelector('#healthBar200')};
let enemyHealth50text = {
  element: document.querySelector('#healthBar50text')};
let enemyHealth100text = {
  element: document.querySelector('#healthBar100text')};
let enemyHealth200text = {
  element: document.querySelector('#healthBar200text')};
let rocketX = 5;
let rocketY = 67;
let rocketVelocity = 0;
let enemy1Velocity = -2;
let enemy2Velocity = -2;
let enemy3Velocity = -2;
let enemyHealth50Velocity = -2;
let enemyHealth100Velocity = -2;
let enemyHealth200Velocity = -2;
let enemyHealth50textVelocity = -2;
let enemyHealth100textVelocity = -2;
let enemyHealth200textVelocity = -2;
let rocket = document.querySelector("#rocket");
const fps = 60;

function startGame() {
  setInterval(Step, 1000 / fps);
  initKeybordMovement();
}

function Step() {
  renderEnemy(enemyHealth50text, healthBar50text, enemyHealth50, healthBar50, enemy1);
  renderEnemy(enemyHealth100text, healthBar100text, enemyHealth100, healthBar100, enemy2);
  renderEnemy(enemyHealth200text, healthBar200text, enemyHealth200, healthBar200, enemy3);
  renderBullet (bullet);
  enemy1.x = moveEnemy(enemy1.x, enemy1Velocity);
  enemy2.x = moveEnemy(enemy2.x, enemy2Velocity);
  enemy3.x = moveEnemy(enemy3.x, enemy3Velocity);
  enemyHealth50.x = moveEnemy(enemyHealth50.x, enemyHealth50Velocity);
  enemyHealth100.x = moveEnemy(enemyHealth100.x, enemyHealth100Velocity);
  enemyHealth200.x = moveEnemy(enemyHealth200.x, enemyHealth200Velocity);
  enemyHealth50text.x = moveEnemy(enemyHealth50text.x, enemyHealth50textVelocity);
  enemyHealth100text.x = moveEnemy(enemyHealth100text.x, enemyHealth100textVelocity);
  enemyHealth200text.x = moveEnemy(enemyHealth200text.x, enemyHealth200textVelocity);
  bullet.x += bullet.velocityX;
  bullet.y += bullet.velocityY;
  moveRocket();
  checkEnemyShipCollision(enemy1);
  checkEnemyShipCollision(enemy2);
  checkEnemyShipCollision(enemy3);
  if (checkEnemyRocketCollision(enemy1.x, enemy1.y)) {
    healthBar50.value -= 4;
    if (healthBar50.value === 0) {
      enemy1.x -= 9999;
      enemyHealth50.x -= 9999;
    }
  }
  if (checkEnemyRocketCollision(enemy2.x, enemy2.y)) {
    healthBar100.value -= 4;
    if (healthBar100.value === 0) {
      enemy2.x -= 9999;
    }
  }
  if (checkEnemyRocketCollision(enemy3.x, enemy3.y)) {
    healthBar200.value -= 4;
    if (healthBar200.value === 0) {
      enemy3.x -= 9999;
    }
  }
  renderRocket();
  renderShip();
}

function renderEnemy (text, textValue, health, healthValue, enemy) {
  health.element.style.left = enemy.x;
  health.element.style.top = enemy.y - 20;
  health.element.style.width = enemy.width;
  health.element.style.height = enemy.height*0.1;
  textValue.value = healthValue.value / healthValue.max;
  textValue.innerHTML = `${healthValue.value} / ${healthValue.max} HP`;
  text.element.style.left = enemy.x;
  text.element.style.top = enemy.y - 40;
  text.element.style.width = enemy.width;
  enemy.element.style.left = enemy.x;
  enemy.element.style.top = enemy.y;
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
