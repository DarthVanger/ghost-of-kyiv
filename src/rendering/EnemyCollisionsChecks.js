import { gameState } from '../gameState.js'
import { deadEnemyXPosition } from './Helpers.js'
import { bulletArray, removeBullet } from '../weapons/gatling.js'
import { explosion } from '../rendering/Explosion.js'
import { rockets, removePlayerRocket } from '../rocket.js'
import {
  soundRocketShot,
  soundRocketHit,
  soundEnemyDieExplosion,
} from '../music.js'
import { gameOver } from '../gameOver.js'

export default function performCollisionChecksForEnemy(enemy) {
  const airfighter = gameState.airfighter
  for (let rocket of rockets) {
    if (checkEnemyRocketCollision(enemy, rocket)) {
      if (rocket.critChance) {
        enemy.enemyHealth.element.value -= Math.floor(rocket.dmg * rocket.crit)
      } else {
        enemy.enemyHealth.element.value -= rocket.dmg
      }
      removePlayerRocket(rocket)
      soundRocketHit.play()
    }
  }

  if (checkPlayerRocketCollision(enemy)) {
    airfighter.health.element.value -= enemy.rocket.dmg
    enemy.rocket.dmg = 0
    soundRocketHit.play()
  }

  if (enemy.enemyHealth.element.value <= 0 && enemy.isAlive) {
    document.querySelector('#gifContainerExplosion').append(explosion)
    explosion.style.left = enemy.x + enemy.width / 2 - explosion.width / 2
    explosion.style.top = enemy.y + enemy.height / 2 - explosion.height / 2
    enemy.isAlive = false
    enemy.x = deadEnemyXPosition
    soundEnemyDieExplosion.play()
    setTimeout(() => {
      explosion.remove()
    }, 700)
  }
}

function checkEnemyRocketCollision(enemy, rocket) {
  if (
    rocket.x > enemy.x &&
    rocket.y > enemy.y &&
    rocket.x < enemy.x + enemy.width &&
    rocket.y < enemy.y + enemy.height
  ) {
    soundRocketShot.pause()
    soundRocketShot.currentTime = 0
    return true
  }
}

function checkPlayerRocketCollision(enemy) {
  const airfighterHitBox = gameState.airfighter.getHitBox()

  if (
    airfighterHitBox.x + airfighterHitBox.width > enemy.rocket.x &&
    airfighterHitBox.x < enemy.rocket.x + enemy.rocket.width &&
    airfighterHitBox.y + airfighterHitBox.height > enemy.rocket.y &&
    airfighterHitBox.y < enemy.rocket.y + enemy.rocket.height
  ) {
    enemy.rocket.element.remove()
    enemy.rocket.x = deadEnemyXPosition
    soundRocketShot.pause()
    soundRocketShot.currentTime = 0
    explosionEffect(airfighterHitBox)
    return true
  }
  playerDiesIfHpBelowZiro()
}

function explosionEffect(airplane) {
  document.querySelector('#gifContainerExplosion').append(explosion)
  explosion.style.left = airplane.x + airplane.width / 2 - explosion.width / 2
  explosion.style.top = airplane.y + airplane.height / 2 - explosion.height / 2
  setTimeout(() => {
    explosion.remove()
  }, 700)
}

export function enemyCollisionWithBullet(enemy) {
  bulletArray.forEach((bullet) => checkBulletCollision(bullet, enemy))
}

function checkBulletCollision(bullet, enemy) {
  const isCollisionWithEnemy = checkCollision(bullet, enemy)
  const isCollisionWithRocket = checkCollision(bullet, enemy.rocket)
  const isOutOfScreen = bullet.x > window.innerWidth
  if (isCollisionWithEnemy) {
    if (bullet.critChance) {
      enemy.enemyHealth.element.value -= 2 * bullet.dmg
    } else {
      enemy.enemyHealth.element.value -= bullet.dmg
    }
  }
  if (isCollisionWithRocket) {
    enemy.rocket.x = deadEnemyXPosition
    enemy.rocket.vx = 0
    enemy.rocket.element.remove()
  }
  if (isOutOfScreen || isCollisionWithEnemy || isCollisionWithRocket) {
    removeBullet(bullet)
  }
}

function playerDiesIfHpBelowZiro() {
  if (gameState.airfighter.health.element.value <= 0) {
    gameOver()
  }
}

function checkCollision(bullet, enemy) {
  return (
    bullet.x > enemy.x &&
    bullet.y > enemy.y &&
    bullet.x < enemy.x + enemy.width &&
    bullet.y < enemy.y + enemy.height
  )
}

export function checkEnemyShipCollision(enemy) {
  const airfighterHitBox = gameState.airfighter.getHitBox()
  const airfighter = gameState.airfighter

  if (
    airfighterHitBox.x + airfighterHitBox.width > enemy.x &&
    airfighterHitBox.x < enemy.x + enemy.width &&
    airfighterHitBox.y + airfighterHitBox.height > enemy.y &&
    airfighterHitBox.y < enemy.y + enemy.height
  ) {
    airfighter.health.element.value -= Math.floor(
      enemy.enemyHealth.element.value / 2
    )
    soundEnemyDieExplosion.play()
    explosionEffect(enemy)
    enemy.x = deadEnemyXPosition
    playerDiesIfHpBelowZiro()
  }
}
