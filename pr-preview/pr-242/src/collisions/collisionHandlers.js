import { gameState } from '../gameState.js'
import { scoreBonuses } from '../scores/scores.js'
import { removeBullet } from '../weapons/gatling.js'
import { explosionEffect } from '../rendering/Explosion.js'
import { deadEnemyXPosition } from '../rendering/Helpers.js'
import { removePlayerRocket } from '../weapons/rocket.js'
import { soundRocketHit, soundEnemyDieExplosion } from '../music.js'

// player airplane <-> enemy airplane
export function handlePlayerCollisionWithEnemy(airfighter, enemy) {
  airfighter.health.element.value -= Math.floor(
    enemy.enemyHealth.element.value / 2
  )
  soundEnemyDieExplosion.play()
  explosionEffect(enemy)
  enemy.x = deadEnemyXPosition
}

// enemy rocket <-> player airplane
export function handlePlayerCollisionWithEnemyRocket(
  enemy,
  enemyRocket,
  player
) {
  player.health.element.value -= enemyRocket.dmg
  enemyRocket.dmg = 0
  enemyRocket.element.remove()
  explosionEffect(enemyRocket)
  const index = enemy.rockets.indexOf(enemyRocket)
  enemy.rockets.splice(index)
  soundRocketHit.play()
}

// player rocket <-> enemy airplane
export function handlePlayerRocketCollisionWithEnemy(playerRocket, enemy) {
  if (playerRocket.critChance) {
    enemy.enemyHealth.element.value -= Math.floor(
      playerRocket.dmg * playerRocket.crit
    )
  } else {
    enemy.enemyHealth.element.value -= playerRocket.dmg
  }
  removePlayerRocket(playerRocket)
  soundRocketHit.play()
}

// player bullet <-> enemy airplane
export function handlePlayerBulletColiisionWithEnemy(playerBullet, enemy) {
  if (playerBullet.critChance) {
    enemy.enemyHealth.element.value -= 2 * playerBullet.dmg
  } else {
    enemy.enemyHealth.element.value -= playerBullet.dmg
  }
  removeBullet(playerBullet)
}

// player bullet <-> enemy rocket
export function handlePlayerBulletCollisionWithEnemyRocket(
  playerBullet,
  enemyRocket
) {
  enemyRocket.x = deadEnemyXPosition
  enemyRocket.vx = 0
  enemyRocket.element.remove()

  gameState.score += scoreBonuses.killRocket
}

export function handlePlayerRocketCollisionWithEnemyRocket(
  playerRocket,
  enemyRocket
) {
  explosionEffect(enemyRocket)
  enemyRocket.x = deadEnemyXPosition
  enemyRocket.vx = 0
  enemyRocket.element.remove()
  removePlayerRocket(playerRocket)

  gameState.score += scoreBonuses.killRocket
}
