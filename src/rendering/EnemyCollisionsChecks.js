import { enemyDies } from '/src/enemy/enemy.js'
import { gameState } from '../gameState.js'
import { deadEnemyXPosition } from './Helpers.js'
import { bulletArray, removeBullet } from '../weapons/gatling.js'
import { explosion } from '../rendering/Explosion.js'
import { rockets, removePlayerRocket } from '../weapons/rocket.js'
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
  enemy.rockets.forEach((rocket, index) => {
    if (checkPlayerRocketCollision(rocket)) {
      airfighter.health.element.value -= rocket.dmg
      rocket.dmg = 0
      enemy.rockets.splice(index)
      soundRocketHit.play()
    }
  })

  const enemyHp = enemy.enemyHealth.element.value
  if (enemyHp <= 0 && enemy.isAlive) {
    enemyDies(enemy)
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

function checkPlayerRocketCollision(rocket) {
  const airfighterHitBox = gameState.airfighter.getHitBox()

  if (
    airfighterHitBox.x + airfighterHitBox.width > rocket.x &&
    airfighterHitBox.x < rocket.x + rocket.width &&
    airfighterHitBox.y + airfighterHitBox.height > rocket.y &&
    airfighterHitBox.y < rocket.y + rocket.height
  ) {
    rocket.element.remove()
    rocket.x = deadEnemyXPosition
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

  const isOutOfScreen = bullet.x > window.innerWidth
  if (isCollisionWithEnemy) {
    if (bullet.critChance) {
      enemy.enemyHealth.element.value -= 2 * bullet.dmg
    } else {
      enemy.enemyHealth.element.value -= bullet.dmg
    }
  }
  enemy.rockets.forEach((rocket) => {
    const isCollisionWithRocket = checkCollision(bullet, rocket)
    if (isCollisionWithRocket) {
      rocket.x = deadEnemyXPosition
      rocket.vx = 0
      rocket.element.remove()
    }
    if (isOutOfScreen || isCollisionWithEnemy || isCollisionWithRocket) {
      removeBullet(bullet)
    }
  })
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
