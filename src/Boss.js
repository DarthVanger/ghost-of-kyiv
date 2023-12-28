import { addGatling } from './weapons/gatling.js'
import {
  createRocket,
  updateEnemyRocketAtack,
} from './weapons/enemyRocketAtack.js'
import {
  levelCompleteScreen,
  bossCompleteScreenText,
} from './levelCompleteScreen.js'
export let level3Boss
import { gameState } from './gameState.js'

function createBossHp(boss, i, maxHealth) {
  boss.enemyHealth = {}
  boss.enemyHealth.vx = -2
  boss.enemyHealth.element = document.createElement('meter')
  boss.enemyHealth.element.setAttribute('min', 0)
  boss.enemyHealth.element.setAttribute('low', maxHealth / 3)
  boss.enemyHealth.element.setAttribute('high', (maxHealth / 3) * 2)
  boss.enemyHealth.element.setAttribute('optimum', maxHealth)
  boss.enemyHealth.element.setAttribute('max', maxHealth)
  boss.enemyHealth.element.setAttribute('value', maxHealth)
  boss.enemyHealth.element.id = 'healthBar200-' + i
  boss.enemyHealth.element.className = 'healthBar200'
  document.body.append(boss.enemyHealth.element)

  boss.enemyHealthText = {}
  boss.enemyHealthText.vx = -2
  boss.enemyHealthText.element = document.createElement('div')
  boss.enemyHealthText.element.id = 'healthBar200text-' + i
  boss.enemyHealthText.element.className = 'healthBar200text'
  document.body.append(boss.enemyHealthText.element)
}

export class Boss {
  constructor({ src, width, height, i, maxHealth, manoeuvre }) {
    this.element = document.createElement('img')
    this.element.id = 'boss'
    this.index = i
    this.element.className = 'boss'
    this.element.src = src
    this.width = width
    this.height = height
    this.x = Math.floor(Math.random() * 200) + window.innerWidth
    this.y =
      150 + Math.floor(Math.random() * (window.innerHeight - height - 500))
    this.vx = -2
    this.rockets = []
    this.rocketDmg = 50
    this.attack = updateEnemyRocketAtack
    this.vy = 0
    this.isAlive = true
    this.manoeuvre = manoeuvre
    this.createRocket = createRocket
    createBossHp(this, i, maxHealth)
    gameState.enemies.push(this)
  }
}

export function createBoss() {
  let boss
  boss = new Boss({
    src: 'img/boss.webp',
    width: 250,
    height: 120,
    i: 1,
    maxHealth: 1000,
    manoeuvre: bossbehavior,
  })

  const bossRocketImg = document.createElement('img')
  bossRocketImg.className = 'enemyRocket'
  bossRocketImg.src = 'img/mrRocket.gif'
  boss.isRocketLaunched = false
  document.body.append(bossRocketImg)

  createRocket(boss)
  boss.behavior = bossbehavior
  addGatling(boss)
  document.body.append(boss.element)
  level3Boss = boss
}

function bossbehavior() {
  const bossAppearance = this.x < window.innerWidth - this.width * 1.1
  if (bossAppearance) {
    this.vx = 0
    if (this.vy == 0) {
      this.vy = 2
    }
    const topMotionFrame = this.y < 0 + this.height / 2
    if (topMotionFrame) {
      this.vy *= -1
    }
    const bottobMotionFrame = this.y > window.innerHeight - this.height * 2
    if (bottobMotionFrame) {
      this.vy *= -1
    }
  }
}

export function changeWinText() {
  levelCompleteScreen.innerHTML = bossCompleteScreenText
}
