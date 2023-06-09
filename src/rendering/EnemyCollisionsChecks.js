import { airfighter } from '../player/airfighter.js'
import {
  deadEnemyXPosition,
  rocketDefaultX,
  rocketDefaultY,
} from './Helpers.js'
import { bulletArray, removeBullet } from '../gatling.js'
import { explosion } from '../rendering/Explosion.js'
import { rocket } from '../rocket.js'
import { playerDiesIfHpBelowZiro } from '../player/airfighter.js'
import {
  soundRocketShot,
  soundRocketHit,
  soundEnemyDieExplosion,
  soundMainTheme,
  soundGameOver,
  soundboss,
} from '../music.js'

export default function performCollisionChecksForEnemy(enemy) {
  if (checkEnemyRocketCollision(enemy)) {
    enemy.enemyHealth.element.value -= rocket.dmg
    rocket.dmg = 0
    soundRocketHit.play()
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
  if (rocket.dmg <= 0) {
    rocket.x = airfighter.x + rocketDefaultX
    rocket.y = airfighter.y + rocketDefaultY
    rocket.velocity -= 8
    rocket.dmg = 50
    rocket.element.src = 'img/Rocket.gif'
  }
}

function checkEnemyRocketCollision(enemy) {
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
  if (
    airfighter.x + airfighter.width > enemy.rocket.x &&
    airfighter.x < enemy.rocket.x + enemy.rocket.width &&
    airfighter.y + airfighter.height > enemy.rocket.y &&
    airfighter.y < enemy.rocket.y + enemy.rocket.height
  ) {
    enemy.rocket.element.remove()
    enemy.rocket.x = deadEnemyXPosition
    soundRocketShot.pause()
    soundRocketShot.currentTime = 0
    explosionEffect(airfighter)
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
    enemy.enemyHealth.element.value -= 5
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

function checkCollision(bullet, enemy) {
  return (
    bullet.x > enemy.x &&
    bullet.y > enemy.y &&
    bullet.x < enemy.x + enemy.width &&
    bullet.y < enemy.y + enemy.height
  )
}

export function checkEnemyShipCollision(enemy) {
  if (
    airfighter.x + airfighter.width > enemy.x &&
    airfighter.x < enemy.x + enemy.width &&
    airfighter.y + airfighter.height > enemy.y &&
    airfighter.y < enemy.y + enemy.height
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
