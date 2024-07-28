import { mobileControls } from './touch.js'
import { gamePauseAction } from './gameMenuActions.js'
import { createPlayerRocket } from './weapons/rocket.js'
import { soundRocketShot } from './music.js'
import { gameState } from './gameState.js'


export let controls = []

export const keyCode = {
  a: 65,
  w: 87,
  s: 83,
  d: 68,
  space: 32,
  r: 82,
  p: 80,
  esc: 27,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  f: 70,
}

export function initKeybordMovement() {
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
  mobileControls.fireRocket.addEventListener('touchstart', () => handleTouch(keyCode.r))
  mobileControls.fireBullet.addEventListener('touchstart', () => handleTouch(keyCode.space))
  mobileControls.fireFlare.addEventListener('touchstart', () => handleTouch(keyCode.f))
  mobileControls.fireRocket.addEventListener('touchend', () => handleTouchEnd(keyCode.r))
  mobileControls.fireBullet.addEventListener('touchend', () => handleTouchEnd(keyCode.space))
  mobileControls.fireFlare.addEventListener('touchend', () => handleTouchEnd(keyCode.f))
}
function handleTouch(numKeyKode) {
  controls.push(numKeyKode)
}

function handleTouchEnd(numKeyKode) {
  controls.splice(controls.indexOf(numKeyKode), 1)
}


function handleKeyDown(event) {
  const isGameControllKeyPressed = Object.values(keyCode).includes(
    event.keyCode
  )
  if (isGameControllKeyPressed && controls.indexOf(event.keyCode) === -1) {
    controls.push(event.keyCode)
  }
  if (controls.includes(keyCode.p) || controls.includes(keyCode.esc)) {
    gamePauseAction()
  }
}

function handleKeyUp(event) {
  const isGameControllKeyUnpressed = Object.values(keyCode).includes(
    event.keyCode
  )
  if (isGameControllKeyUnpressed) {
    controls.splice(controls.indexOf(event.keyCode), 1)
  }
}

function fireRocket() {
  createPlayerRocket(gameState.airfighter)
  soundRocketShot.play()
}
