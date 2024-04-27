import { gameState } from '../gameState.js'

export function createRocket(enemy) {
  const enemyRocketImg = document.createElement('img')
  enemyRocketImg.className = 'enemyRocket'
  enemyRocketImg.src = 'img/mrRocket.gif'
  document.body.append(enemyRocketImg)
  enemy.isRocketCooldown = false

  const rocket = {
    x: enemy.x,
    y: enemy.y + enemy.height - enemy.height / 5,
    width: 120,
    height: 12,
    dmg: enemy.rocketDmg,
    vx: enemy.vx - 8,
    vy: 0,
    element: enemyRocketImg,
  }
  enemy.rockets.push(rocket)
  return rocket
}

export function moveEnemyRocket(enemy) {
  enemy.rockets.forEach((rocket) => {
    rocket.x += rocket.vx
    rocket.y += rocket.vy
  })
}

export function moveEnemyTargetedRocket(enemy) {
  enemy.rockets.forEach((rocket) => {
    if (gameState.playerFlares.length) {
      moveToPlayerOrFlare(gameState.airfighter, gameState.playerFlares, rocket)
    }
    rocket.x += rocket.vx
    rocket.y += rocket.vy
  })
}

function moveToPlayerOrFlare(player, flares, rocket) {
  const targets = [player, ...flares]

  let smallestDist = Infinity
  let closestTarget

  targets.forEach((el) => {
    const distToTarget = Math.hypot(el.x - rocket.x, el.y - rocket.y)
    if (distToTarget <= smallestDist) {
      smallestDist = distToTarget
      closestTarget = el
    }
  })
  const targetCenter = {
    x: closestTarget.x + closestTarget.width / 2,
    y: closestTarget.y + closestTarget.height / 2,
  }
  const distX = targetCenter.x - rocket.x
  const distY = targetCenter.y - rocket.y
  const dist = Math.sqrt(distX * distX + distY * distY)
  rocket.vx = (8 * distX) / dist
  rocket.vy = (8 * distY) / dist

  rocket.rotationX = Math.atan2(distY, distX)
  rocket.element.style.transform = `rotate(${rocket.rotationX}rad)`
}

export function launchRocketIfOnScreen(enemy) {
  if (enemy.x < window.innerWidth) {
    if (!enemy.isRocketCooldown) {
      enemy.isRocketCooldown = true
      setTimeout(() => {
        enemy.isRocketCooldown = false
        enemy.createRocket(enemy)
      }, 3000)
    }
  }
}

export function renderEnemyRocket(enemy) {
  enemy.rockets.forEach((rocket) => {
    rocket.element.style.left = rocket.x
    rocket.element.style.top = rocket.y
  })
}

export function updateEnemyRocketAtack(enemy) {
  renderEnemyRocket(enemy)
  moveEnemyRocket(enemy)
  launchRocketIfOnScreen(enemy)
}

export function updateEnemyGroundAtack(enemy) {
  renderEnemyRocket(enemy)
  moveEnemyTargetedRocket(enemy)
  launchRocketIfOnScreen(enemy)
}
