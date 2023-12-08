import { addGatling } from './gatling.js'
import { createRocket } from './enemyRocketAtack.js'
import { levelCompleteScreen, bossCompleteScreenText } from './levelCompleteScreen.js'
import { enemies } from './enemy.js';
export let level3Boss;

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
    constructor(src, width, height, i, maxHealth, manoeuvre) {
      this.element = document.createElement('img')
      this.element.id = 'boss' 
      this.index = i
      this.element.className = 'boss'
      this.element.src = src
      this.width = width
      this.height = height
      this.x = Math.floor(Math.random() * 200) + window.innerWidth
      this.y = 150 + Math.floor(Math.random() * (window.innerHeight-height-500))
      this.vx = -2
      this.vy = 0
      this.isAlive = true
      this.manoeuvre = manoeuvre
      createBossHp(this, i, maxHealth)
      enemies.push(this)
    }
}

export function createBoss() {
    let boss
    boss = new Boss('img/boss.webp', 250, 120, 1, 1000, bossbehavior)
  
    const bossRocketImg = document.createElement('img')
    bossRocketImg.className = 'enemyRocket'
    bossRocketImg.src = 'img/mrRocket.gif'
    boss.isRocketLaunched = false
    document.body.append(bossRocketImg)
  
    createRocket(boss, 50)
    boss.behavior = bossbehavior
    addGatling(boss)
    document.body.append(boss.element)
    level3Boss = boss
  }

  
  function bossbehavior() {
    const bossAppearance = this.x < window.innerWidth - this.width * 1.1
    if (bossAppearance) {
      this.vx = 0
      if(this.vy == 0) {
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
    
    const restartRocket = this.rocket.x < 0 - this.rocket.width * 2
    const ammoDamage = 50
    
      if (restartRocket || this.rocket.dmg == 0) {
        createRocket(this, ammoDamage)

      }
      
    }
  }

export function changeWinText() {
    levelCompleteScreen.innerHTML = bossCompleteScreenText
}
  