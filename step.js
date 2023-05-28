import { enemies, explosion, renderEnemy } from './enemy.js';
import { rocket, renderRocket, moveRocket } from './rocket.js';
import { bulletArray, enemyDies, gatling, setBulletArray } from "./gatling.js";
import { airfighter, renderShip, moveShipLeft, moveShipRight, moveShipUp, moveShipDown } from "./airfighter.js";
import { soundRocketShot, soundRocketHit, soundEnemyDieExplosion, soundGameOver, soundMainTheme, soundLevelComplete, soundIntro} from "./music.js";
import { levelState } from './gameManager.js';
export const fps = 60;

export const gameState = {
  isGamePaused : false,
  gameIntervalId : undefined,
} 

export function Step () {
  enemies.forEach(renderEnemy);
  enemies.forEach(renderEnemyRocket);
  enemies.forEach(moveEnemy);
  enemies.forEach(moveEnemyRocket);
  bulletArray.forEach(moveBullet)
  ammoElement.innerHTML = `<img class="ammoImg" src="img/ammo-gatling-img.gif"> ${gatling.ammo} <br> <img class="ammoImg" src="img/ammo-rocket-img.gif"> ${rocket.ammo}`;
  moveRocket();
  enemies.forEach(checkEnemyShipCollision);
  enemies.forEach(collisionSHmolision);
  enemies.forEach(launchRocketIfOnScreen);
  enemies.forEach(enemyCollisionWithBullet)

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

  function collisionSHmolision (enemy) {
    if (checkEnemyRocketCollision(enemy)) {
      enemy.enemyHealth.element.value -= rocket.dmg;
      rocket.dmg = 0;
      soundRocketHit.play();
    }

    if (checkPlayerRocketCollision(enemy)) {
      airfighter.health.element.value -= enemy.rocket.dmg;
      enemy.rocket.dmg = 0;
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



function moveBullet(bullet) {
  bullet.x += bullet.velocity
  bullet.y += bullet.margin
    bullet.element.style.left = bullet.x + 'px'
    bullet.element.style.top = bullet.y + 'px'
}

function enemyCollisionWithBullet(enemy) {
  const filteredBullets = bulletArray.filter((bullet, index) => {
    if (
    bullet.x > enemy.x &&
    bullet.y > enemy.y &&
    bullet.x < enemy.x + enemy.width &&
    bullet.y < enemy.y + enemy.height) 
    {
      enemy.enemyHealth.element.value -= 5
      bulletArray[index].element.remove()
      return false
    }
    if(bullet.x > window.innerWidth) {
      bulletArray[index].element.remove()
      return false
    }
    return true
  }
  )
  setBulletArray(filteredBullets)
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
    explosionEffect(enemy)
    enemy.x = enemyDies;
    playerDiesIfHpBelowZiro();
  }
}

function explosionEffect (airplane) {
  document.querySelector('#gifContainerExplosion').append(explosion);
  explosion.style.left = airplane.x + airplane.width/2 - explosion.width/2;
  explosion.style.top = airplane.y + airplane.height/2 - explosion.height/2;
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
