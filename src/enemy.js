import performCollisionChecksForEnemy, {
  checkEnemyShipCollision,
  enemyCollisionWithBullet,
} from './rendering/EnemyCollisionsChecks.js'
import { gameState } from './gameState.js'

export function deleteEnemies() {
  gameState.enemies.forEach(deleteEnemyImg)
  gameState.enemies = []
}

function deleteEnemyImg(enemy) {
  enemy.enemyHealth.element.remove()
  enemy.enemyHealthText.element.remove()
  enemy.element.remove()
  enemy.rockets.forEach((rocket) => {
    rocket.element.remove()
  })
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

export class Enemy {
  constructor(
    {src,
    width,
    height,
    i,
    maxHealth,
    manoeuvre,
    attack,
    createRocket}
  ) {
    this.element = document.createElement('img')
    this.element.id = 'enemy' + i
    this.index = i
    this.element.className = 'enemy'
    this.element.src = src
    this.x = getRandomEnemyX(i)
    this.y = Math.floor(Math.random() * (innerHeight - 200) + 50)
    this.width = width
    this.height = height
    this.rockets = []
    this.rocketDmg = 20
    this.vx = -2
    this.vy = 0
    this.isAlive = true
    this.manoeuvre = manoeuvre
    this.attack = attack
    this.createRocket = createRocket
    createHealth(this, i, maxHealth)
  }
}

function getRandomEnemyX(enemyIndex) {
  if (enemyIndex < 1) {
    return Math.floor(Math.random() * 400) + 500
  } else {
    return (
      Math.floor(Math.random() * 400) +
      500 +
      gameState.enemies[enemyIndex - 1].x
    )
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
  enemy.attack(enemy)
  renderEnemy(enemy)

  moveEnemy(enemy)
  checkEnemyShipCollision(enemy)
  performCollisionChecksForEnemy(enemy)
  enemyCollisionWithBullet(enemy)
}

function moveEnemy(enemy) {
  enemy.x += enemy.vx
  enemy.y += enemy.vy
}
