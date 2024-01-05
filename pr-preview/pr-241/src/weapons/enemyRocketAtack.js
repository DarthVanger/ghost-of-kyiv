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
  moveEnemyRocket(enemy)
  launchRocketIfOnScreen(enemy)
}
