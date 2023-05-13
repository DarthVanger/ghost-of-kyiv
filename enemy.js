export let enemies = [];
export let explosion = document.createElement('img')
explosion.id = 'explosion-' + new Date()
explosion.className = 'explosion'
explosion.src = './img/explosion.gif';
explosion.width = 120;
explosion.height = 130;

function createFirstEnemy(enemy, i) {
  enemy.e.src = 'img/su-3.png';
  enemy.width = 250;
  enemy.height = 80;

}

function createSecondEnemy(enemy, i){
  enemy.e.src = 'img/su-27.png';
  enemy.width = 270;
  enemy.height =  100;

}

function createThirdEnemy(enemy, i) {
  enemy.e.src = 'img/z-10.png';
    enemy.width = 330;
    enemy.height = 200;
}

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

function createEnemies() {
  for(let i = 0; i < 11; i++) {  
    let enemy = {};
    enemy.e = document.createElement('img')
    enemy.e.id = 'enemy' + i;

    if(i < 5){
      createFirstEnemy(enemy, i)
      createHealth(enemy, i, 50)

    } else if( i >= 5 && i <= 9) {
      createSecondEnemy(enemy, i)
      createHealth(enemy, i, 100)

    } else{
      createThirdEnemy(enemy, i)
      createHealth(enemy, i, 200)
    }
    
    document.body.append(enemy.e)
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
    enemy.element = document.querySelector('#enemy' + i);
    enemies.push(enemy)
  }
}

export function renderEnemy (enemy) {
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

createEnemies()