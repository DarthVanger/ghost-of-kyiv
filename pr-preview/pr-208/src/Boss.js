import { addGatling } from './gatling.js'
import { createRocket } from './enemy.js'
import {
  levelCompleteScreen,
  bossCompleteScreenText,
} from './levelCompleteScreen.js'
export let level3Boss

function createBossHp(boss, i, maxHealth) {
  boss.enemyHealth = {}
  boss.enemyHealth.velocity = -2
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
  boss.enemyHealthText.velocity = -2
  boss.enemyHealthText.element = document.createElement('div')
  boss.enemyHealthText.element.id = 'healthBar200text-' + i
  boss.enemyHealthText.element.className = 'healthBar200text'
  document.body.append(boss.enemyHealthText.element)
}

function createBossElement(src, width, height, i, maxHealth) {
  let boss = {}
  boss.element = document.createElement('img')
  boss.element.id = 'boss'
  boss.element.className = 'boss'
  boss.element.src = src
  boss.x = Math.floor(Math.random() * 400) + window.innerWidth
  boss.y = Math.floor(Math.random() * (innerHeight - 300) + 50)
  boss.width = width
  boss.height = height
  boss.velocity = -2
  boss.velocityY = 2
  boss.isAlive = true
  createBossHp(boss, i, maxHealth)
  return boss
}

export function createBoss() {
  let boss
  boss = createBossElement('img/boss.webp', 250, 80, 1, 1000)

  const bossRocketImg = document.createElement('img')
  bossRocketImg.className = 'enemyRocket'
  bossRocketImg.src = 'img/mrRocket.gif'
  boss.isRocketLaunched = false
  document.body.append(bossRocketImg)

  boss.rocket = {
    x: boss.x,
    y: boss.y,
    width: 120,
    height: 12,
    dmg: 200,
    vx: 0,
    vy: 0,
    element: bossRocketImg,
  }
  boss.behavior = bossbehavior
  addGatling(boss)
  document.body.append(boss.element)
  level3Boss = boss
}

function bossbehavior() {
  const bossAppearance = this.x < window.innerWidth - this.width * 1.1
  if (bossAppearance) {
    this.velocity = 0

    const topMotionFrame = this.y < 0 + this.height / 2
    if (topMotionFrame) {
      this.velocityY *= -1
    }
    const bottobMotionFrame = this.y > window.innerHeight - this.height * 2
    if (bottobMotionFrame) {
      this.velocityY *= -1
    }
    this.y -= this.velocityY

    const restartRocket = this.rocket.x < 0 - this.rocket.width * 2
    if (restartRocket) {
      this.rocket.x = this.x
      this.rocket.y = this.y
    }
    if (this.rocket.vx == 0) {
      const ammoDamage = Math.floor(this.enemyHealth.element.value / 10)
      createRocket(this, ammoDamage)
    }
  }
}

export function changeWinText() {
  levelCompleteScreen.innerHTML = bossCompleteScreenText
}
