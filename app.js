let wallX = 600;
let wallY = 81;
let shipX = 0;
let shipY = 0;
let rocketX = 20;
let rocketY = 70;
let rocketVelocity = 0;
let ship = document.querySelector('#airfighter');
let rocket = document.querySelector('#rocket');
let wall = document.querySelector('#wall');
const fps = 60;

function init() {
  console.log('init');
  setInterval (Step , 1000/fps);
  initKeybordMovement();
}

function Step () {
  renderWall();
  moveRocket();
  renderRocket();
  renderShip();
}

function renderWall () {
  wall.style.left = wallX;
  wall.style.top = wallY;
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
function handleKeyDown(event) {
  console.log('handleKeyDown');
  if (event.key == 'r') {
    fireRocket();
  }

  if (event.key == 'a') {
    moveShipLeft();
  }

  if (event.key == 's') {
    shipY += 10;
    rocketY += 10;
  }

  if (event.key == 'w') {
    shipY -= 10; 
    rocketY -= 10;
  }

  if (event.key == 'd') { 
    shipX += 10;
    rocketX += 10;
  }
}

/**
 * render ship left
 */
function moveShipLeft() {
  shipX -= 10; 
  rocketX -= 10;
  console.log('moveShipLeft');
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

init();
