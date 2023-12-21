import { addGatling } from './gatling.js'
import {
  createRocket,
  updateEnemyRocketAtack,
} from './weapons/enemyRocketAtack.js'
import performCollisionChecksForEnemy, {
  checkEnemyShipCollision,
  enemyCollisionWithBullet,
} from './rendering/EnemyCollisionsChecks.js'
import {
  manoeuvreUpAtHalfScreen,
  manoeuvreDownAtHalfScreen,
  manoeuvreZigzagAtQuarterScreen,
  manoeuvreStraightFast,
} from './enemyManoeuvre.js'
export let enemies = []

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
  enemy.enemyHealth = {}
  enemy.enemyHealth.vx = -2
  enemy.enemyHealth.element = document.createElement('meter')
  enemy.enemyHealth.element.setAttribute('min', 0)
  enemy.enemyHealth.element.setAttribute('low', maxHealth / 3)
  enemy.enemyHealth.element.setAttribute('high', (maxHealth / 3) * 2)
  enemy.enemyHealth.element.setAttribute('optimum', maxHealth)
  enemy.enemyHealth.element.setAttribute('max', maxHealth)
  enemy.enemyHealth.element.setAttribute('value', maxHealth)
  enemy.enemyHealth.element.id = 'healthBar200-' + i
  enemy.enemyHealth.element.className = 'healthBar200'
  document.body.append(enemy.enemyHealth.element)

  enemy.enemyHealthText = {}
  enemy.enemyHealthText.vx = -2
  enemy.enemyHealthText.element = document.createElement('div')
  enemy.enemyHealthText.element.id = 'healthBar200text-' + i
  enemy.enemyHealthText.element.className = 'healthBar200text'
  document.body.append(enemy.enemyHealthText.element)
}

class Enemy {
  constructor(src, width, height, i, maxHealth, manoeuvre) {
    this.element = document.createElement('img')
    this.element.id = 'enemy' + i
    this.index = i
    this.element.className = 'enemy'
    this.element.src = src
    this.x = getRandomEnemyX(i)
    this.y = Math.floor(Math.random() * (innerHeight - 200) + 50)
    this.width = width
    this.height = height
    this.vx = -2
    this.vy = 0
    this.isAlive = true
    this.manoeuvre = manoeuvre
    createHealth(this, i, maxHealth)
  }
}

function createSu3(i) {
  return new Enemy('img/su-3.png', 250, 80, i, 50, manoeuvreUpAtHalfScreen)
}

function createSu27(i) {
  return new Enemy('img/su-27.png', 270, 100, i, 100, manoeuvreDownAtHalfScreen)
}

function createZ10(i) {
  return new Enemy(
    'img/z-10.png',
    330,
    200,
    i,
    200,
    manoeuvreZigzagAtQuarterScreen
  )
}

function createSu35(i) {
  return new Enemy('img/su-35.png', 349, 91, i, 50, manoeuvreStraightFast)
}

export function createEnemies(maxEnemies) {
  for (let i = 0; i < maxEnemies; i++) {
    let enemy
    if (i < 3) {
      enemy = createSu3(i)
    } else if (i >= 3 && i <= 6) {
      enemy = createSu27(i)
    } else if (i >= 7 && i <= 9) {
      enemy = createSu35(i)
    } else {
      enemy = createZ10(i - 3)
    }
    const defaultDamageBullet = 20
    createRocket(enemy, defaultDamageBullet)

    addGatling(enemy)
    document.body.append(enemy.element)
    enemies.push(enemy)
  }
}
function getRandomEnemyX(enemyIndex) {
  if (enemyIndex < 1) {
    return Math.floor(Math.random() * 400) + 500
  } else {
    return Math.floor(Math.random() * 400) + 500 + enemies[enemyIndex - 1].x
  }
}

export function renderEnemy(enemy) {
  renderEnemyHealth(enemy)
  renderEnemyHealthText(enemy)
  renderEnemyImg(enemy)
}

function renderEnemyHealth(enemy) {
  enemy.enemyHealth.element.style.left = enemy.x
  enemy.enemyHealth.element.style.top = enemy.y - 20
  enemy.enemyHealth.element.style.width = enemy.width
  enemy.enemyHealth.element.style.height = enemy.height * 0.1
}

function renderEnemyHealthText(enemy) {
  const currentHp = enemy.enemyHealth.element.value
  const maxHp = enemy.enemyHealth.element.max
  enemy.enemyHealthText.element.innerText = `${currentHp} / ${maxHp} HP`
  enemy.enemyHealthText.element.style.left = enemy.x
  enemy.enemyHealthText.element.style.top = enemy.y - 35
  enemy.enemyHealthText.element.style.width = enemy.width
}

function renderEnemyImg(enemy) {
  enemy.element.style.left = enemy.x
  enemy.element.style.top = enemy.y
  enemy.element.style.width = enemy.width
  enemy.element.style.height = enemy.height
}

export function updateEnemy(enemy) {
  enemy.manoeuvre(enemy)
  updateEnemyRocketAtack(enemy)
  renderEnemy(enemy)

  moveEnemy(enemy)
  checkEnemyShipCollision(enemy)
  performCollisionChecksForEnemy(enemy)
  enemyCollisionWithBullet(enemy)
}

function moveEnemy(enemy) {
  if (!enemy.isRocketLaunched) {
    enemy.rocket.x += enemy.vx
  }
  enemy.x += enemy.vx
  enemy.y += enemy.vy
}
