import { frontBgY } from '../background.js'

export function manoeuvreUpAtHalfScreen(enemy) {
  const halfScreenX = window.innerWidth / 2
  if (enemy.x < halfScreenX) {
    enemy.vy = -2
  }
}

export function manoeuvreDownAtHalfScreen(enemy) {
  const halfScreenX = window.innerWidth / 2
  if (enemy.x < halfScreenX) {
    enemy.vy = 2
  }
}

export function manoeuvreZigzagAtQuarterScreen(enemy) {
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

export function manoeuvreStraightFast(enemy) {
  enemy.vx = -15
}
export function manoeuvreOnGround(enemy) {
  enemy.element.classList.add('ground-enemy')
  enemy.y = window.innerHeight - enemy.height + frontBgY + 100
  enemy.vx = -2
}
