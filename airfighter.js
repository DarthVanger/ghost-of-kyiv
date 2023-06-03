import { rocket } from "./rocket.js";

const acceleration = 1;

export let airfighter = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  width: 300,
  height: 130,
  element: document.querySelector('#airfighter'),
  health: {
    x: 0,
    y: 0,
    element: document.querySelector("#playerHealth")
  },
  healthtext: {
    x: 0,
    y: 0,
    element: document.querySelector("#playerHealthText")
  },
  rocketDefaultX: 80,
  rocketDefaultY: 70,
  rocketMaxDistance: 1500,
  isShipMovingUp: false,
  isShipMovingLeft: false,
  isShipMovingRight: false,
  isShipMovingDown: false,
};

export function moveAirfighterToInitalPosition() {
  airfighter.x = 0;
  airfighter.y = 0;

  rocket.x = airfighter.rocketDefaultX;
  rocket.y = airfighter.rocketDefaultY;
}

export function renderShip() {
  const afterForardDesccelerationCondition = airfighter.vx > 0 && airfighter.isShipMovingRight == false;
  const afterBackDesccelerationCondition = airfighter.vx < 0 && airfighter.isShipMovingLeft == false;
  airfighter.element.style.left = airfighter.x;
  airfighter.element.style.top = airfighter.y;
  airfighter.health.element.style.left = airfighter.x;
  airfighter.health.element.style.top = airfighter.y;
  airfighter.health.element.style.width = airfighter.width;
  airfighter.health.element.style.height = airfighter.height*0.1;
  airfighter.healthtext.element.value = airfighter.health.element.value / airfighter.health.element.max;
  airfighter.healthtext.element.innerHTML = `${airfighter.health.element.value} / ${airfighter.health.element.max} HP`;
  airfighter.healthtext.element.style.left = airfighter.x;
  airfighter.healthtext.element.style.top = airfighter.y - 35;
  airfighter.healthtext.element.style.width = airfighter.width;
  
  if (afterForardDesccelerationCondition) {
    afterForardDescceleration();
    if (rocket.velocity < 7) {
      rocket.x += airfighter.vx;
    }
  }  

  if (afterBackDesccelerationCondition) {
    afterBackDescceleration();
    if (rocket.velocity < 7) {
      rocket.x += airfighter.vx;
    }
  }
}


function accelerationBack() {
  const maxBackSpeed = airfighter.vx < -5;
  if (airfighter.x > 0) {
    airfighter.x += airfighter.vx;
    if (!maxBackSpeed) {
      airfighter.vx -= acceleration / 2;
    }
  }
}

function accelerationForward() {
  const maxForwardSpeed = airfighter.vx >= 10;
  if (airfighter.x + airfighter.width < screen.width) {
    airfighter.x += airfighter.vx;
    if (!maxForwardSpeed) {
      airfighter.vx += acceleration;
    }
  }
}

function afterForardDescceleration() {
  airfighter.x += airfighter.vx;
  airfighter.vx -= acceleration / 4;
}

function afterBackDescceleration() {
  airfighter.x += airfighter.vx;
  airfighter.vx += acceleration / 8;
}


export function moveShipDown() {
  if (airfighter.y + airfighter.height > window.innerHeight-50 ) {
    document.querySelector('#gameover-screen').style.display = '';
    airfighter.x = 0;
    airfighter.y = 0;
    soundRocketHit.pause();
    soundEnemyDieExplosion.play();
    setTimeout (function() {
      soundMainTheme.pause();
      soundGameOver.play();
    }, 900);
  }
  airfighter.y += 10;
  if (rocket.velocity < 7) {
    rocket.y += 10;
  } 
}


export function moveShipLeft() {
  if (airfighter.x > 0) {
    accelerationBack();
    if (rocket.velocity < 7) {
      rocket.x += airfighter.vx;
    }
  }
}
  
export function moveShipRight() {
  accelerationForward();
  if (rocket.velocity < 7) {
    rocket.x += airfighter.vx;
  }

}
  
export function moveShipUp() {
  if (airfighter.y > 0) {
    airfighter.y -= 10;
    if (rocket.velocity < 7) {
      rocket.y -= 10;
    }
  }
}
