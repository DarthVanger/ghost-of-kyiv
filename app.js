const fps = 60;
const enemyWidth = 360;
const enemyHeight = 200;
const rocketDefaultX = 5;
const rocketDefaultY = 67;
const rocketMaxDistance = 1500;
const enemyDies = 9999;

let enemy1 = {
  x: 800,
  y: 100,
  width: 360,
  height: 200,
  velocity: -2,
  element: document.querySelector("#enemy1"),
};

let enemy2 = {
  x: 1400,
  y: 350,
  width: 360,
  height: 200,
  velocity: -2,
  element: document.querySelector("#enemy2"),
};

let enemy3 = {
  x: 1900,
  y: 250,
  width: 360,
  height: 200,
  velocity: -2,
  element: document.querySelector("#enemy3"),
};

let airfighter = {
  x: 0,
  y: 0,
  width: 250,
  height: 80,
  element: document.querySelector('#airfighter'),
};

let gatling = {
  x: 0,
  y: 0,
  velocity: -2,
  ammo: 1500,
  dmg: 10,
  element: document.querySelector("#gatling"),
};

let rocket = {
  x: 5,
  y: 67,
  width: 120,
  ammo: 5,
  dmg: 50,
  velocity: 0,
  element: document.querySelector("#rocket"),
}

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
  velocity: -2,
  element: document.querySelector('#healthBar50')
};
let enemyHealth100 = {
  velocity: -2,
  element: document.querySelector('#healthBar100')
};
let enemyHealth200 = {
  velocity: -2,
  element: document.querySelector('#healthBar200')
};
let enemyHealth50text = {
  velocity: -2,
  element: document.querySelector('#healthBar50text')
};
let enemyHealth100text = {
  velocity: -2,
  element: document.querySelector('#healthBar100text')
};
let enemyHealth200text = {
  velocity: -2,
  element: document.querySelector('#healthBar200text')
};
let isShipMovingUp = false;
let isShipMovingLeft = false;
let isShipMovingRight = false;
let isShipMovingDown = false;

function startGame() {
  setInterval(Step, 1000 / fps);
  initKeybordMovement();
}

function Step() {
  renderEnemy(enemyHealth50text, healthBar50text, enemyHealth50, healthBar50, enemy1);
  renderEnemy(enemyHealth100text, healthBar100text, enemyHealth100, healthBar100, enemy2);
  renderEnemy(enemyHealth200text, healthBar200text, enemyHealth200, healthBar200, enemy3);
  renderBullet (bullet);
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
  bullet.x += bullet.velocityX;
  bullet.y += bullet.velocityY;
  moveRocket();
  checkEnemyShipCollision(enemy1);
  checkEnemyShipCollision(enemy2);
  checkEnemyShipCollision(enemy3);
  ammoElement.innerHTML = `Gatling Ammo: ${gatling.ammo} <br> Rocket Ammo: ${rocket.ammo}`;

  if (checkEnemyRocketCollision(enemy1.x, enemy1.y)) {
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

  if (checkEnemyRocketCollision(enemy2.x, enemy2.y)) {
    healthBar100.value -= rocket.dmg;
    rocket.dmg -= rocket.dmg;
    if (healthBar100.value <= 0) {
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

  if (checkEnemyRocketCollision(enemy3.x, enemy3.y)) {
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

  if (checkEnemyGatlingCollision(enemy1.x, enemy1.y)) {
    healthBar50.value -= gatling.dmg;
    gatling.x = enemy1.x + enemyWidth - gatling.velocity;
    if (healthBar50.value === 0) {
      enemy1.x -= enemyDies;
    }
  }

  if (checkEnemyGatlingCollision(enemy2.x, enemy2.y)) {
    healthBar100.value -= gatling.dmg;
    gatling.x = enemy2.x + enemyWidth - gatling.velocity;
    if (healthBar100.value === 0) {
      enemy2.x -= enemyDies;
    }
  }

  if (checkEnemyGatlingCollision(enemy3.x, enemy3.y)) {
    healthBar200.value -= gatling.dmg;
    gatling.x = enemy3.x + enemyWidth - gatling.velocity;
    if (healthBar200.value === 0) {
      enemy3.x -= enemyDies;
    }
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

function renderBullet (shitBullet) {
  shitBullet.element.style.left = shitBullet.x;
  shitBullet.element.style.top = shitBullet.y;
  shitBullet.element.style.transform = `rotate(${shitBullet.rotation}rad)`;
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
	document.addEventListener('mousedown' , handleClick);
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
    rocket.x > enemyX &&
    rocket.y > enemyY &&
    rocket.x < enemyX + enemyWidth &&
    rocket.y < enemyY + enemyHeight
  ) {
    return true;
  }
}

function checkEnemyGatlingCollision(enemyX, enemyY) {
  if (
    gatling.x > enemyX &&
    gatling.y > enemyY &&
    gatling.x < enemyX + enemyWidth &&
    gatling.y < enemyY + enemyHeight
  ) {
    return true;
  }
}

/**
 * Bind all game keyboard controls
 */
function handleClick(event) {
  fireGatling(event);
}

function handleKeyDown(event) {
  console.log (event.key);
  if ((event.key == "r" || event.key == 'к') && rocket.ammo != 0) {
    fireRocket();
    fireBullet();
  }

  if (event.key == "a" || event.key == 'ф') {
    isShipMovingLeft = true;
  }

  if (event.key == "s" || event.key == 'ы' || event.key == 'і') {
    isShipMovingDown = true;
  }

  if (event.key == "w" || event.key == 'ц') {
    isShipMovingUp = true;
  }

  if (event.key == "d" || event.key == 'в') {
    isShipMovingRight = true;
  }
}

function handleKeyUp (event) {
  if (event.key == "a" || event.key == 'ф') {
    isShipMovingLeft = false;
  }

  if (event.key == "s" || event.key == 'ы' || event.key == 'і') {
    isShipMovingDown = false;
  }

  if (event.key == "w" || event.key == 'ц') {
    isShipMovingUp = false;
  }

  if (event.key == "d" || event.key == 'в') {
    isShipMovingRight = false;
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
    
  //if (airfighter.element.src != "Airfighter_ua_movedown.gif") {
  //  airfighter.element.src = "Airfighter_ua_movedown.gif";
  //}
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

function fireGatling (event) {
	gatling.x = event.pageX;
	gatling.y = event.pageY;
  gatling.ammo -= 10;
}

function fireBullet() {
  bullet.velocityX += airfighter.x / Math.hypot(airfighter.x, airfighter.y) * 10;
  bullet.velocityY += airfighter.y / Math.hypot(airfighter.x, airfighter.y) * 10;
  bullet.rotation += Math.PI / 2 - Math.atan(airfighter.x / airfighter.y);
  console.log((Math.PI / 2 - Math.atan(airfighter.x / airfighter.y ))*180 / Math.PI);
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
