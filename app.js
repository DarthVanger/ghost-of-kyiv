let groundX = 600;
let groundY = 81;
let shipX = 0;
let shipY = 0;
let rocketX = 20;
let rocketY = 70;
let rocketVelocity = 0;
let groundVelocity = -2;
let ship = document.querySelector('#airfighter');
let rocket = document.querySelector('#rocket');
let ground = document.querySelector('#ground');
const fps = 60;

function init() {
  console.log('init');
  setInterval (Step , 1000/fps);
  initKeybordMovement();
}

function Step () {
  renderWall();
  moveGround();
  moveRocket();
  checkGroundShipCollision();
  checkGroundRocketCollision();
  renderRocket();
  renderShip();
}

function renderWall () {
  ground.style.left = groundX;
  ground.style.top = groundY;
}

/**
 * Update rocket img coordinates according to variables
 */
function renderRocket () {
  rocket.style.left = rocketX;
  rocket.style.top = rocketY;
}

function renderShip () {
  ship.style.left = shipX;
  ship.style.top = shipY;
}

function initKeybordMovement() {
  console.log('initKeybordMovement');
  document.addEventListener('keydown' , handleKeyDown);
}

function checkGroundShipCollision() {
  if (groundX < shipX + 250 && groundY < shipY + 80) {
    alert('Game Over!');
  }
}

function checkGroundRocketCollision() {
  if (rocketX > groundX) {
    groundY += 800;
    console.log('rocketGroundCollision');
  }

}

/**
 * Bind all game keyboard controls 
 */
function handleKeyDown(event) {
  console.log('handleKeyDown');
  console.log('key: ', event.key);
  if (event.key == 'r') {
    fireRocket();
  }

  if (event.key == 'a') {
    moveShipLeft();
  }

  if (event.key == 's') {
    moveShipDown();
  }

  if (event.key == 'w') {
    moveShipUp();
  }

  if (event.key == 'd') {
    moveShipRight(); 
  }
}

function moveShipLeft() {
  shipX -= 10; 
  rocketX -= 10;
  console.log('moveShipLeft');
}

function moveShipRight() {
  shipX += 10;
  rocketX += 10;
  console.log('moveShipRight');
}

function moveShipUp() {
  shipY -= 10; 
  rocketY -= 10;
  console.log('moveShipUp');
}

function moveShipDown() {
  shipY += 10; 
  rocketY += 10;
  console.log('moveShipDown');
}

/**
 * Launch rocket
 */
function fireRocket() {
  console.log('fireRocket');
  rocketVelocity += 8;
}

/**
 * Change coordinates of rocket according to rocket velocity
 */
function moveRocket() {
  rocketX += rocketVelocity;
}

/**
 * Change coordinates of ground according to ground velocity
 */
 function moveGround() {
  groundX += groundVelocity;
}

init();
