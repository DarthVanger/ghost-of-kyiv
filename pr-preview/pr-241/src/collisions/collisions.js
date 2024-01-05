import { gameState } from '../gameState.js'
import { rockets } from '../weapons/rocket.js'
import { bulletArray } from '../weapons/gatling.js'

import {
  handlePlayerCollisionWithEnemy,
  handlePlayerCollisionWithEnemyRocket,
  handlePlayerRocketCollisionWithEnemy,
  handlePlayerBulletColiisionWithEnemy,
  handlePlayerBulletCollisionWithEnemyRocket,
} from './collisionHandlers.js'

export function handleCollisions() {
  playerCollisionWithEnemy()
  playerCollisionWithEnemyRocket()
  playerRocketCollisionWithEnemy()
  playerBulletCollisionWithEnemy()
  playerBulletCollisionWithEnemyRocket()
}

function checkCollision(obj1, obj2) {
  const hitBox1 = obj1.getHitBox?.() || obj1
  const hitBox2 = obj2.getHitBox?.() || obj2

  return (
    hitBox1.x + hitBox1.width > hitBox2.x &&
    hitBox1.x < hitBox2.x + hitBox2.width &&
    hitBox1.y + hitBox1.height > hitBox2.y &&
    hitBox1.y < hitBox2.y + hitBox2.height
  )
}

// player airplane <-> enemy airplane
function playerCollisionWithEnemy() {
  for (const enemy of gameState.enemies) {
    if (checkCollision(gameState.airfighter, enemy)) {
      handlePlayerCollisionWithEnemy(gameState.airfighter, enemy)
    }
  }
}

// enemy rocket <-> player airplane
function playerCollisionWithEnemyRocket() {
  for (const enemy of gameState.enemies) {
    for (const enemyRocket of enemy.rockets) {
      if (checkCollision(gameState.airfighter, enemyRocket)) {
        handlePlayerCollisionWithEnemyRocket(
          enemy,
          enemyRocket,
          gameState.airfighter
        )
      }
    }
  }
}

// player rocket <-> enemy airplane
function playerRocketCollisionWithEnemy() {
  for (const playerRocket of rockets) {
    for (const enemy of gameState.enemies) {
      if (checkCollision(playerRocket, enemy)) {
        handlePlayerRocketCollisionWithEnemy(playerRocket, enemy)
      }
    }
  }
}

// player bullet <-> enemy airplane
function playerBulletCollisionWithEnemy() {
  for (const playerBullet of bulletArray) {
    for (const enemy of gameState.enemies) {
      if (checkCollision(playerBullet, enemy)) {
        handlePlayerBulletColiisionWithEnemy(playerBullet, enemy)
      }
    }
  }
}

// player bullet <-> enemy rocket
function playerBulletCollisionWithEnemyRocket() {
  for (const playerBullet of bulletArray) {
    for (const enemy of gameState.enemies) {
      for (const enemyRocket of enemy.rockets) {
        if (checkCollision(playerBullet, enemyRocket)) {
          handlePlayerBulletCollisionWithEnemyRocket(playerBullet, enemyRocket)
        }
      }
    }
  }
}
