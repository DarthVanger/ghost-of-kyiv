import { fireGatlingPlayer } from './gatling.js'
import { airfighter } from './player/Player.js'
import { mobileControls } from './touch.js'
import { gamePauseAction } from './gameMenuActions.js'
import { createPlayerRocket } from './rocket.js'
import { soundRocketShot } from './music.js'

export let controls = []

export function initKeybordMovement() {
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
  mobileControls.fireButton.addEventListener('click', fireRocket)
}

// prettier-ignore
function handleKeyDown(event) {
  if ((event.key === 'r' || event.key === 'к' ||
      event.key === 'a' || event.key === 'ф' ||
      event.key === 's' || event.key === 'ы' || event.key === 'і' ||
      event.key === 'w' || event.key === 'ц' ||
      event.key === 'd' || event.key === 'в' ||
      event.key === 'p' || event.key === 'з' ||
      event.key === ' ') &&
      controls.indexOf(event.key) === -1
    ) {
      controls.push(event.key)
  }

  if (controls.includes('p')) {
    gamePauseAction()
  }

  if (controls.includes(' ')) {
    fireGatlingPlayer()
  }
}

// prettier-ignore
function handleKeyUp(event) {
  if (event.key === 'r' || event.key === 'к' ||
  event.key === 'a' || event.key === 'ф' ||
  event.key === 's' || event.key === 'ы' || event.key === 'і' ||
  event.key === 'w' || event.key === 'ц' ||
  event.key === 'd' || event.key === 'в' ||
  event.key === 'p' || event.key === 'з' ||
  event.key === ' '
) {
  controls.splice(controls.indexOf(event.key), 1)
  }
}

function fireRocket() {
  createPlayerRocket(airfighter)
  soundRocketShot.play()
}
