import { enemies, renderEnemy } from './enemy.js';
import { rocket, renderRocket, moveRocket } from './rocket.js';
import { bulletArray, gatling, moveBullet } from "./gatling.js";
import { airfighter, moveShipLeft, moveShipRight, moveShipUp, moveShipDown } from "./airfighter.js";
import { soundMainTheme, soundLevelComplete } from "./music.js";
import { rocketDefaultX, rocketDefaultY } from './rendering/Helpers.js';
import performCollisionChecksForEnemy, { checkEnemyShipCollision, enemyCollisionWithBullet } from './rendering/EnemyCollisionsChecks.js';
import { level2boss } from './Boss.js';
export const fps = 60;

export const gameState = {
  isGamePaused : false,
  gameIntervalId : undefined,
} 

export function Step () {
  if(enemies[0]?.behavior) {
    level2boss.behavior()
  }
  enemies.forEach(renderEnemy);
  enemies.forEach(renderEnemyRocket);
  enemies.forEach(moveEnemy);
  enemies.forEach(moveEnemyRocket);
  bulletArray.forEach(moveBullet);
  moveRocket();
  changeAmmo()
  enemies.forEach(checkEnemyShipCollision);
  enemies.forEach(performCollisionChecksForEnemy);
  enemies.forEach(launchRocketIfOnScreen);
  enemies.forEach(enemyCollisionWithBullet)
  moveBackground()
  function moveEnemyRocket(enemy) {
    
    enemy.rocket.x += enemy.rocket.vx;
    }

  function launchEnemyRocket (enemy) {
    enemy.rocket.vx = -8;
  }
  
  function launchRocketIfOnScreen (enemy) {
    if (enemy.x < window.innerWidth) {
      if (!enemy.isRocketLaunched) {
        launchEnemyRocket(enemy);
        enemy.isRocketLaunched = true;
      }
    }
  }
    
  if (rocket.x > airfighter.x + airfighter.rocketMaxDistance) {
    rocket.x = airfighter.x + rocketDefaultX;
    rocket.y = airfighter.y + rocketDefaultY;
    rocket.velocity -= 8;
    rocket.dmg = 50;
    rocket.element.src = "img/Rocket.gif";
  }
  
  renderRocket();
  airfighter.render();

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

function renderEnemyRocket(enemy) {
  enemy.rocket.element.style.left = enemy.rocket.x;
  enemy.rocket.element.style.top = enemy.rocket.y;
}

function moveEnemy(enemy) {
  if (!enemy.isRocketLaunched) {
    enemy.rocket.x += enemy.velocity;
  }
  return (enemy.x += enemy.velocity);
}

function changeAmmo() {
  ammoElement.innerHTML = `<img class="ammoImg" src="img/ammo-gatling-img.gif"> ${gatling.ammo} <br> <img class="ammoImg" src="img/ammo-rocket-img.gif"> ${rocket.ammo}`;
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
let backBgX = 0;
let middleBgX = 0;
let frontBgX = 0;
let backBgVx = -0.3;
let middleBgVx = -0.5;
let frontBgVx = -0.75;

function moveBackground() {
  let backBg = document.querySelector('#bg-back')
  let middleBg = document.querySelector('#bg-middle')
  let frontBg = document.querySelector('#bg-front')
  if (backBgX < window.innerWidth - backBg.width) {
    backBgVx *= -1
  }
  if (middleBgX < window.innerWidth - middleBg.width) {
    middleBgVx *= -1
  }
  if (frontBgX < window.innerWidth - frontBg.width) {
    frontBgVx *= -1
  }
  if (backBgX > 0) {
    backBgVx *= -1
  }
  if (middleBgX > 0) {
    middleBgVx *= -1
  }
  if (frontBgX > 0) {
    frontBgVx *= -1
  }
  backBgX += backBgVx
  middleBgX += middleBgVx
  frontBgX += frontBgVx
  backBg.style.left = backBgX + 'px'
  middleBg.style.left = middleBgX + 'px'
  frontBg.style.left = frontBgX + 'px'
}
