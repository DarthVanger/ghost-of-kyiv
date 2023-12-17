import { fireGatlingPlayer } from './gatling.js'
import { mobileControls } from './touch.js'
import { gamePauseAction } from './gameMenuActions.js'
import { createPlayerRocket } from './rocket.js'
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
  up: 38,
  down: 40,
  left: 37,
  right: 39,
}

export function initKeybordMovement() {
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
  mobileControls.fireButton.addEventListener('click', fireRocket)
}

function handleKeyDown(event) {
  const isGameControllKeyPressed =  Object.values(keyCode).includes(event.keyCode)
  if (isGameControllKeyPressed
    &&
    controls.indexOf(event.keyCode) === -1
  ) {
    controls.push(event.keyCode)
  }
  if (controls.includes(keyCode.p)) {
    gamePauseAction()
  }
}

function handleKeyUp(event) {
  const isGameControllKeyUnpressed =  Object.values(keyCode).includes(event.keyCode)
  if (isGameControllKeyUnpressed) {
    controls.splice(controls.indexOf(event.keyCode), 1)
  }
}

function fireRocket() {
  createPlayerRocket(gameState.airfighter)
  soundRocketShot.play()
}
