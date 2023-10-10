export function su3EnemyBehavior(enemy) {
  const halfScreenX = window.innerWidth / 2
  if (enemy.x < halfScreenX) {
    enemy.vy = -2
  }
}

export function su27EnemyBehavior(enemy) {
  const halfScreenX = window.innerWidth / 2
  if (enemy.x < halfScreenX) {
    enemy.vy = 2
  }
}

export function z10EnemyBehavior(enemy) {
  const bottomYBound = window.innerHeight * 0.75
  const topYBound = window.innerHeight * 0.25

  if (enemy.x < window.innerWidth) {
    if (enemy.vy === 0) {
      enemy.vy = -1
    }

    if (enemy.y > bottomYBound) {
      enemy.vy = -1
    }

    if (enemy.y < topYBound) {
      enemy.vy = 1
    }
  }
}
