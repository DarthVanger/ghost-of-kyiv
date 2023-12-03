export function createRocket(enemy, damage) {
  const enemyRocketImg = document.createElement('img')
  enemyRocketImg.className = 'enemyRocket'
  enemyRocketImg.src = 'img/mrRocket.gif'
  document.body.append(enemyRocketImg)
  enemy.isRocketLaunched = false

  enemy.rocket = {
    x: enemy.x,
    y: enemy.y + enemy.height - enemy.height / 5,
    width: 120,
    height: 12,
    dmg: damage,
    vx: 0,
    vy: 0,
    element: enemyRocketImg,
  }
}

function moveEnemyRocket(enemy) {
  enemy.rocket.x += enemy.rocket.vx
}

function launchRocketIfOnScreen(enemy) {
  if (enemy.x < window.innerWidth) {
    if (!enemy.isRocketLaunched) {
      launchEnemyRocket(enemy)
      enemy.isRocketLaunched = true
    }
  }
}

function launchEnemyRocket(enemy) {
  enemy.rocket.vx = enemy.vx - 8
}

function renderEnemyRocket(enemy) {
  enemy.rocket.element.style.left = enemy.rocket.x
  enemy.rocket.element.style.top = enemy.rocket.y
}

export function updateEnemyRocketAtack(enemy) {
  renderEnemyRocket(enemy)
  moveEnemyRocket(enemy)
  launchRocketIfOnScreen(enemy)
}
