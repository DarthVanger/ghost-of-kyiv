import { enemies, explosion } from './enemy.js';
import { rocket } from './rocket.js';
import { enemyDies, gatling } from "./gatling.js";
import { airfighter } from "./airfighter.js";
import { soundRocketShot, soundRocketHit, soundEnemyDieExplosion, soundGameOver, soundMainTheme, soundLevelComplete, soundIntro} from "./music.js";

export const gameState = {
  isGamePaused : false,
  gameIntervalId : undefined,
} 

export function Step () {
  enemies.forEach(renderEnemy);
  enemies.forEach(renderEnemyRocket);
  enemies.forEach(moveEnemy);
  enemies.forEach(moveEnemyRocket);
  ammoElement.innerHTML = `<img class="ammoImg" src="img/ammo-gatling-img.gif"> ${gatling.ammo} <br> <img class="ammoImg" src="img/ammo-rocket-img.gif"> ${rocket.ammo}`;
  moveRocket();
  enemies.forEach(checkEnemyShipCollision);
  enemies.forEach(collisionSHmolision);
  enemies.forEach(launchRocketIfOnScreen); //launchrocket 

  function moveEnemyRocket(enemy) {
    enemy.rocket.x += enemy.rocket.vx;
  }

  function launchEnemyRocket (enemy) {
    enemy.rocket.vx -= 8;
  }

  function launchRocketIfOnScreen (enemy) {
    if (enemy.x < window.innerWidth) {
      if (!enemy.isRocketLaunchenemy) {
        launchEnemyRocket(enemy);
        enemy.isRocketLaunchenemy = true;
      }
    }
  }

  function collisionSHmolision (enemy) {
    if (checkEnemyRocketCollision(enemy)) {
      enemy.enemyHealth.element.value -= rocket.dmg;
      rocket.dmg -= rocket.dmg;
      soundRocketHit.play();
    }

    if (checkPlayerRocketCollision(enemy)) {
      airfighter.health.element.value -= enemy.rocket.dmg;
      enemy.rocket.dmg -= enemy.rocket.dmg;
      soundRocketHit.play();
    }

    if (enemy.enemyHealth.element.value <= 0  && enemy.isAlive) {
      document.querySelector('#gifContainerExplosion').append(explosion);
      explosion.style.left = enemy.x + enemy.width/2 - explosion.width/2;
      explosion.style.top = enemy.y + enemy.height/2 - explosion.height/2;
      enemy.isAlive = false;
      enemy.x = enemyDies;
      soundEnemyDieExplosion.play();
      setTimeout(() => {
        explosion.remove()
      },700)
    }

    if (rocket.dmg <= 0) {
      rocket.x = airfighter.x + airfighter.rocketDefaultX;
      rocket.y = airfighter.y + airfighter.rocketDefaultY;
      rocket.velocity -= 8;
      rocket.dmg = 50;
      rocket.element.src = "img/Rocket.gif";
    }
  }

  if (rocket.x > airfighter.x + airfighter.rocketMaxDistance) {
    rocket.x = airfighter.x + airfighter.rocketDefaultX;
    rocket.y = airfighter.y + airfighter.rocketDefaultY;
    rocket.velocity -= 8;
    rocket.dmg = 50;
    rocket.element.src = "img/Rocket.gif";
  }

  renderRocket();
  renderShip();

  if (airfighter.isShipMovingUp) {
    moveShipUp();
  }
  if (airfighter.isShipMovingDown) {
    moveShipDown();
  }
  if (airfighter.isShipMovingLeft) {
    moveShipLeft();
  }
  if (airfighter.isShipMovingRight) {
    moveShipRight();
  }

  const lastEnemy = enemies[enemies.length-1]
  const vuletivZaRamku = lastEnemy.x < 0 - lastEnemy.width
  if (vuletivZaRamku) {
    stopInterval();
    document.querySelector('#levelComplete').style.display = '';
    fadeIn(levelComplete, 400);
    soundMainTheme.pause();
    soundMainTheme.currentTime = 0;
    soundLevelComplete.play();
    soundLevelComplete.volume = 0.4;
  }
}

function renderEnemy (enemy) {
  enemy.enemyHealth.element.style.left = enemy.x;
  enemy.enemyHealth.element.style.top = enemy.y - 20;
  enemy.enemyHealth.element.style.width = enemy.width;
  enemy.enemyHealth.element.style.height = enemy.height*0.1;
  enemy.enemyHealthText.element.value = enemy.enemyHealth.element.value / enemy.enemyHealth.element.max
  enemy.enemyHealthText.element.innerHTML = `${enemy.enemyHealth.element.value} / ${enemy.enemyHealth.element.max} HP`;
  enemy.enemyHealthText.element.style.left = enemy.x;
  enemy.enemyHealthText.element.style.top = enemy.y - 35;
  enemy.enemyHealthText.element.style.width = enemy.width;
  enemy.element.style.left = enemy.x;
  enemy.element.style.top = enemy.y;
  enemy.element.style.width = enemy.width;
  enemy.element.style.height = enemy.height;
}

function renderRocket() {
  rocket.element.style.left = rocket.x;
  rocket.element.style.top = rocket.y;
}

function renderEnemyRocket(enemy) {
  enemy.rocket.element.style.left = enemy.rocket.x;
  enemy.rocket.element.style.top = enemy.rocket.y;
}

function renderShip() {
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
}

function moveRocket() {
  rocket.x += rocket.velocity;
}

function moveEnemy(enemy) {
  if (!enemy.isRocketLaunchenemy) {
    enemy.rocket.x += enemy.velocity;
  }
  return (enemy.x += enemy.velocity);
}

function moveShipDown() {
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

function moveShipLeft() {
  if (airfighter.x > 0) {
    airfighter.x -= 3;
    if (rocket.velocity < 7) {
      rocket.x -= 3;
    }
  }
}

function moveShipRight() {
  if (airfighter.x + airfighter.width < screen.width) {
    airfighter.x += 10;
    if (rocket.velocity < 7) {
      rocket.x += 10;
    }
  }
}

function moveShipUp() {
  if (airfighter.y > 0) {
    airfighter.y -= 10;
    if (rocket.velocity < 7) {
      rocket.y -= 10;
    }
  }
}

function checkEnemyRocketCollision(enemy) {
  if (
    rocket.x > enemy.x &&
    rocket.y > enemy.y &&
    rocket.x < enemy.x + enemy.width &&
    rocket.y < enemy.y + enemy.height
  ) {
    soundRocketShot.pause();
    soundRocketShot.currentTime = 0;
    return true;
  }
}

function checkPlayerRocketCollision(enemy) {
  if (
    airfighter.x + airfighter.width > enemy.rocket.x &&
    airfighter.x < enemy.rocket.x + enemy.rocket.width &&
    airfighter.y + airfighter.height > enemy.rocket.y &&
    airfighter.y < enemy.rocket.y + enemy.rocket.height
    ) {
      soundRocketShot.pause();
      soundRocketShot.currentTime = 0;
      explosionEffect(airfighter);
      return true;
  }

  playerDiesIfHpBelowZiro();
}

function checkEnemyShipCollision(enemy) {
  if (
    airfighter.x + airfighter.width > enemy.x &&
    airfighter.x < enemy.x + enemy.width &&
    airfighter.y + airfighter.height > enemy.y &&
    airfighter.y < enemy.y + enemy.height
  ) {
    airfighter.health.element.value -= 35;
    soundEnemyDieExplosion.play();
    explosionEffect(enemy);
    enemy.x = enemyDies;
    playerDiesIfHpBelowZiro();
  }
}

function explosionEffect (position) {
  document.querySelector('#gifContainerExplosion').append(explosion);
  explosion.style.left = position.x + position.width/2 - explosion.width/2;
  explosion.style.top = position.y + position.height/2 - explosion.height/2;
  setTimeout(() => {
    explosion.remove()
  },700);
}

function playerDiesIfHpBelowZiro () {
  if (airfighter.health.element.value <= 0) {
    document.querySelector('#gameover-screen').style.display = '';
    airfighter.x = 0;
    airfighter.y = 0;
    soundRocketHit.pause();
    soundEnemyDieExplosion.play();
    setTimeout(() => {
    soundMainTheme.pause();
    soundGameOver.play();
    }, 900);
  }
}

function fadeIn(element, duration) {
  element.style.opacity = 0;
  var last = +new Date();
  var tick = function() {
    element.style.opacity = +element.style.opacity + (new Date() - last) / duration;
    last = +new Date();
    if (+element.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };
  tick();
}

export function stopInterval () {
  clearInterval(gameState.gameIntervalId);
  gameState.isGamePaused = true;
}
