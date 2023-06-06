let backBgX = 0
let middleBgX = 0
let frontBgX = 0
let backBgVx = -0.1
let middleBgVx = -0.3
let frontBgVx = -5
let frontBg = document.querySelector('#bg-front')

export function moveBackground() {
  let backBg = document.querySelector('#bg-back')
  let middleBg = document.querySelector('#bg-middle')
  if (backBgX < window.innerWidth - backBg.width) {
    backBgVx *= -1
  }
  if (middleBgX < window.innerWidth - middleBg.width) {
    middleBgVx *= -1
  }
  if (frontBgX < window.innerWidth - frontBg.width) {
    frontBgVx *= -1
  }
  if (backBgX > 0) {
    backBgVx *= -1
  }
  if (middleBgX > 0) {
    middleBgVx *= -1
  }
  if (frontBgX > 0) {
    frontBgVx *= -1
  }
  backBgX += backBgVx
  middleBgX += middleBgVx
  frontBgX += frontBgVx
  backBg.style.left = backBgX + 'px'
  middleBg.style.left = middleBgX + 'px'
  frontBg.style.left = frontBgX + 'px'
}

export function resetBackground() {
  frontBgX = 0;
  frontBg.style.left = frontBgX + 'px'
}
