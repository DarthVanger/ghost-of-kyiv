import { addGatling } from "./gatling.js";

export let enemies = [];
export let explosion = document.createElement('img')
explosion.id = 'explosion-' + new Date()
explosion.className = 'explosion'
explosion.src = './img/explosion.gif';
explosion.width = 120;
explosion.height = 130;

export function deleteEnemies() {
  enemies.forEach(deleteEnemyImg)
  enemies = []
}

function deleteEnemyImg(enemy) {
  enemy.enemyHealth.element.remove()
  enemy.enemyHealthText.element.remove()
  enemy.element.remove()
  enemy.rocket.element.remove()
}

function createHealth(enemy, i, maxHealth) {
  enemy.enemyHealth = {};
  enemy.enemyHealth.velocity = -2;
  enemy.enemyHealth.element = document.createElement('meter')
  enemy.enemyHealth.element.setAttribute('min', 0)
  enemy.enemyHealth.element.setAttribute('low', maxHealth/3)
  enemy.enemyHealth.element.setAttribute('high', maxHealth/3*2)
  enemy.enemyHealth.element.setAttribute('optimum', maxHealth)
  enemy.enemyHealth.element.setAttribute('max', maxHealth)
  enemy.enemyHealth.element.setAttribute('value', maxHealth)
  enemy.enemyHealth.element.id = 'healthBar200-' + i;
  enemy.enemyHealth.element.className = 'healthBar200';
  document.body.append(enemy.enemyHealth.element);
  
  enemy.enemyHealthText = {};
  enemy.enemyHealthText.velocity = -2;
  enemy.enemyHealthText.element = document.createElement('div')
  enemy.enemyHealthText.element.id = 'healthBar200text-' + i;
  enemy.enemyHealthText.element.className = 'healthBar200text';
  document.body.append(enemy.enemyHealthText.element);
}

function createEnemy(src, width, height, i, maxHealth) {
  let enemy = {};
  enemy.element = document.createElement('img')
  enemy.element.id = 'enemy' + i;
  enemy.element.src = src;
  enemy.x = getRandomEnemyX(i)
  enemy.y = Math.floor(Math.random()*(innerHeight-200)+50);
  enemy.width = width;
  enemy.height = height;
  enemy.velocity = -2;
  enemy.isAlive = true;
  createHealth(enemy, i, maxHealth)
  return enemy
}

export function createEnemies() {
  for(let i = 0; i < 1; i++) {
    let enemy;  
    if(i < 5){
      enemy = createEnemy('img/su-3.png', 250, 80, i, 50)
    } else if( i >= 5 && i <= 9) {
      enemy = createEnemy( 'img/su-27.png', 270, 100, i, 100)
    } else{
      enemy = createEnemy('img/z-10.png', 330, 200, i, 200)
    }

    const enemyRocketImg = document.createElement('img');
    enemyRocketImg.className = 'enemyRocket';
    enemyRocketImg.src = 'img/mrRocket.gif';
    enemy.isRocketLaunched = false;
    document.body.append(enemyRocketImg);

    enemy.rocket = {
      x: enemy.x,
      y: enemy.y,
      width: 120,
      height: 12,
      dmg: 20,
      vx: 0,
      vy: 0,
      element: enemyRocketImg,
    }
    addGatling(enemy)
    document.body.append(enemy.element)
    enemies.push(enemy)
  }
}

function getRandomEnemyX (enemyIndex) {
  if(enemyIndex < 1) {
    return Math.floor(Math.random()*400)+400;
    } else {
    return Math.floor(Math.random()*400)+300+(enemies[enemyIndex-1].x);
  }
}

export function renderEnemy(enemy) {
  renderEnemyHealth(enemy);
  renderEnemyHealthText(enemy);
  renderEnemyImg(enemy);
}

function renderEnemyHealth(enemy) {
  enemy.enemyHealth.element.style.left = enemy.x;
  enemy.enemyHealth.element.style.top = enemy.y - 20;
  enemy.enemyHealth.element.style.width = enemy.width;
  enemy.enemyHealth.element.style.height = enemy.height*0.1;
}

function renderEnemyHealthText (enemy) {
  const currentHp = enemy.enemyHealth.element.value
  const maxHp = enemy.enemyHealth.element.max
  enemy.enemyHealthText.element.innerHTML = `${currentHp} / ${maxHp} HP`;
  enemy.enemyHealthText.element.style.left = enemy.x;
  enemy.enemyHealthText.element.style.top = enemy.y - 35;
  enemy.enemyHealthText.element.style.width = enemy.width;
}

function renderEnemyImg(enemy) {
  enemy.element.style.left = enemy.x;
  enemy.element.style.top = enemy.y;
  enemy.element.style.width = enemy.width;
  enemy.element.style.height = enemy.height;
}

createEnemies()
