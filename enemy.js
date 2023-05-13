export let enemies = [];
export let explosion = document.createElement('img')
explosion.id = 'explosion-' + new Date()
explosion.className = 'explosion'
explosion.src = './img/explosion.gif';
explosion.width = 120;
explosion.height = 130;

function createHealth(enemy, i, maxHealth) {
  enemy.enemyHealth = {};
  enemy.enemyHealth.velocity = -2;
  enemy.enemyHealth.elem = document.createElement('meter')
  enemy.enemyHealth.elem.setAttribute('min', 0)
  enemy.enemyHealth.elem.setAttribute('low', maxHealth/3)
  enemy.enemyHealth.elem.setAttribute('high', maxHealth/3*2)
  enemy.enemyHealth.elem.setAttribute('optimum', maxHealth)
  enemy.enemyHealth.elem.setAttribute('max', maxHealth)
  enemy.enemyHealth.elem.setAttribute('value', maxHealth)
  enemy.enemyHealth.elem.id = 'healthBar200-' + i;
  enemy.enemyHealth.elem.className = 'healthBar200';
  document.body.append(enemy.enemyHealth.elem);
  
  enemy.enemyHealthText = {};
  enemy.enemyHealthText.velocity = -2;
  enemy.enemyHealthText.elem = document.createElement('div')
  enemy.enemyHealthText.elem.id = 'healthBar200text-' + i;
  enemy.enemyHealthText.elem.className = 'healthBar200text';
  document.body.append(enemy.enemyHealthText.elem);

  enemy.enemyHealth.element = document.querySelector('#healthBar200-' + i);
  enemy.enemyHealthText.element = document.querySelector('#healthBar200text-' + i)
}

function createEnemy(enemy, src, width, height, i, maxHealth) {
  enemy.element.src = src;
    enemy.width = width;
    enemy.height = height;
    createHealth(enemy, i, maxHealth)
}

function createEnemies() {
  for(let i = 0; i < 11; i++) {  
    let enemy = {};
    enemy.element = document.createElement('img')
    enemy.element.id = 'enemy' + i;

    if(i < 5){
      createEnemy(enemy,'img/su-3.png', 250, 80, i, 50)
    } else if( i >= 5 && i <= 9) {
      createEnemy(enemy, 'img/su-27.png', 270, 100, i, 100)
    } else{
      createEnemy(enemy,'img/z-10.png', 330, 200, i, 200)
    }
    
    document.body.append(enemy.element)
    enemy.name = 'enemy-' + i;
    enemy.isAlive = true;
    enemy.x = 0;

    if(i < 1) {
      enemy.x = Math.floor(Math.random()*400)+400;
      } else {
      enemy.x = Math.floor(Math.random()*400)+300+(enemies[i-1].x);
    }

    enemy.y = Math.floor(Math.random()*(innerHeight-200)+50);
    enemy.velocity = -2;
  
    enemies.push(enemy)
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
