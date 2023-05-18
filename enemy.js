export let enemies = [];
export let explosion = document.createElement('img')
explosion.id = 'explosion-' + new Date()
explosion.className = 'explosion'
explosion.src = './img/explosion.gif';
explosion.width = 120;
explosion.height = 130;

function createFirstEnemyHealth(obj, i) {
  obj.e.src = 'img/su-3.png';
  obj.width = 250;
  obj.height = 80;

  obj.enemyHealth = {};
  obj.enemyHealth.velocity = -2;
  obj.enemyHealth.elem = document.createElement('meter')
  obj.enemyHealth.elem.setAttribute('min', 0)
  obj.enemyHealth.elem.setAttribute('low', 20)
  obj.enemyHealth.elem.setAttribute('high', 35)
  obj.enemyHealth.elem.setAttribute('optimum', 50)
  obj.enemyHealth.elem.setAttribute('max', 50)
  obj.enemyHealth.elem.setAttribute('value', 50)
  obj.enemyHealth.elem.id = 'healthBar50-' + i;
  obj.enemyHealth.elem.className = 'healthBar50';
  document.body.append(obj.enemyHealth.elem);

  obj.enemyHealthText =  {};
  obj.enemyHealthText.velocity = -2;
  obj.enemyHealthText.elem = document.createElement('div')
  obj.enemyHealthText.elem.id = 'healthBar50text-' + i;
  obj.enemyHealthText.elem.className = 'healthBar50text';
  document.body.append(obj.enemyHealthText.elem);

  obj.enemyHealth.element = document.querySelector('#healthBar50-' + i);
  obj.enemyHealthText.element = document.querySelector('#healthBar50text-' + i);
}

function createSecondEnemyHealth(obj, i){
  obj.e.src = 'img/su-27.png';
  obj.width = 270;
  obj.height =  100;

  obj.enemyHealth = {};
  obj.enemyHealth.velocity = -2;
  obj.enemyHealth.elem = document.createElement('meter');
  obj.enemyHealth.elem.setAttribute('min', 0);
  obj.enemyHealth.elem.setAttribute('low', 30);
  obj.enemyHealth.elem.setAttribute('high', 65);
  obj.enemyHealth.elem.setAttribute('optimum', 100);
  obj.enemyHealth.elem.setAttribute('max', 100);
  obj.enemyHealth.elem.setAttribute('value', 100);
  obj.enemyHealth.elem.id = 'healthBar100-' + i;
  obj.enemyHealth.elem.className = 'healthBar100';
  document.body.append(obj.enemyHealth.elem);

  obj.enemyHealthText = {};
  obj.enemyHealthText.velocity = -2;
  obj.enemyHealthText.elem = document.createElement('div')
  obj.enemyHealthText.elem.id = 'healthBar100text-' + i;
  obj.enemyHealthText.elem.className = 'healthBar100text';
  document.body.append(obj.enemyHealthText.elem);
  
  obj.enemyHealth.element = document.querySelector('#healthBar100-' + i);
  obj.enemyHealthText.element = document.querySelector('#healthBar100text-' + i);
}

function createThirdEnemyHealth(obj, i) {
  obj.e.src = 'img/z-10.png';
    obj.width = 330;
    obj.height = 200;

    obj.enemyHealth = {};
    obj.enemyHealth.velocity = -2;
    obj.enemyHealth.elem = document.createElement('meter')
    obj.enemyHealth.elem.setAttribute('min', 0)
    obj.enemyHealth.elem.setAttribute('low', 70)
    obj.enemyHealth.elem.setAttribute('high', 140)
    obj.enemyHealth.elem.setAttribute('optimum', 200)
    obj.enemyHealth.elem.setAttribute('max', 200)
    obj.enemyHealth.elem.setAttribute('value', 200)
    obj.enemyHealth.elem.id = 'healthBar200-' + i;
    obj.enemyHealth.elem.className = 'healthBar200';
    document.body.append(obj.enemyHealth.elem);
    
    obj.enemyHealthText = {};
    obj.enemyHealthText.velocity = -2;
    obj.enemyHealthText.elem = document.createElement('div')
    obj.enemyHealthText.elem.id = 'healthBar200text-' + i;
    obj.enemyHealthText.elem.className = 'healthBar200text';
    document.body.append(obj.enemyHealthText.elem);

    obj.enemyHealth.element = document.querySelector('#healthBar200-' + i);
    obj.enemyHealthText.element = document.querySelector('#healthBar200text-' + i)
}

function createEnemies() {
  for(let i = 0; i < 11; i++) {
    let obj = {};
    obj.e = document.createElement('img')
    obj.e.id = 'enemy' + i;

    if(i < 5){
    createFirstEnemyHealth(obj, i)
  } else if( i >= 5 && i <= 9) {
    createSecondEnemyHealth(obj, i)
  } else{
    createThirdEnemyHealth(obj, i)
  }

    document.body.append(obj.e)
    obj.name = 'enemy-' + i;
    obj.isAlive = true;
    obj.x = 0;

    if(i < 1) {
      obj.x = Math.floor(Math.random()*400)+400;
    } else {
      obj.x = Math.floor(Math.random()*400)+300+(enemies[i-1].x);
    }

    obj.y = Math.floor(Math.random()*(innerHeight-200)+50);
    obj.velocity = -2;
    obj.element = document.querySelector('#enemy' + i);
    enemies.push(obj)
  
    const enemyRocketImg = document.createElement('img');
    enemyRocketImg.className = 'enemyRocket';
    enemyRocketImg.src = 'img/mrRocket.gif';
    obj.isRocketLaunched = false;

    document.body.append(enemyRocketImg);
    // rocket for Enemies
    obj.rocket = {
      x: obj.x,
      y: obj.y,
      width: 120,
      height: 12,
      dmg: 20,
      vx: 0,
      vy: 0,
      element: enemyRocketImg,
    }
  }
}

createEnemies()