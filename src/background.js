let backBgX = 0
let middleBgX = 0
export let frontBgX = 0
export let frontBgY = 0
let middleBgY = 0
let backBgY = 0
let backBgVx = 0.1
let middleBgVx = -0.3
let frontBgDefaultVx = -5
let frontBg = document.querySelector('#bg-front')

export function moveBackground(airfighter) {
  let frontBgVx = frontBgDefaultVx - airfighter.vx / 4
  let backBg = document.querySelector('#bg-back')
  let middleBg = document.querySelector('#bg-middle')
  if (backBgX < window.innerWidth - backBg.getBoundingClientRect().width) {
    backBgVx *= -1
  }
  if (middleBgX < window.innerWidth - middleBg.width) {
    middleBgVx *= -1
  }
  if (backBgX > 0) {
    backBgVx *= -1
  }
  if (middleBgX > 0) {
    middleBgVx *= -1
  }
  backBgX += backBgVx
  middleBgX += middleBgVx
  frontBgX += frontBgVx

  frontBgY = (airfighter.y / window.innerHeight) * 100 * -1
  middleBgY = ((airfighter.y / window.innerHeight) * 100) / 4
  backBgY = ((airfighter.y / window.innerHeight) * 100) / 8

  backBg.style.transform = `translate(${backBgX}px, ${backBgY - 20}px)`
  middleBg.style.transform = `translate(${middleBgX}px, ${middleBgY}px)`
  frontBg.style.transform = `translate(${frontBgX}px, ${frontBgY + 100}px)`
}

export function resetBackground() {
  frontBgX = 0
  frontBg.style.left = frontBgX + 'px'
}
