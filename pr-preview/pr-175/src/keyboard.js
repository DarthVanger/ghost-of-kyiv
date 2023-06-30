import { fireGatlingPlayer } from './gatling.js'
import { airfighter } from './player/Player.js'
import { mobileControls } from './touch.js'
import { gamePauseAction } from './gameMenuActions.js'

export let controls = []

export function initKeybordMovement() {
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
  mobileControls.leftButton.addEventListener('touchstart', function () {
    airfighter.isKeyLeftPressed = true
  })
  mobileControls.rightButton.addEventListener('touchstart', function () {
    airfighter.isKeyRightPressed = true
  })
  mobileControls.topButton.addEventListener('touchstart', function () {
    airfighter.isKeyUpPressed = true
  })
  mobileControls.bottomButton.addEventListener('touchstart', function () {
    airfighter.isKeyDownPressed = true
  })
  mobileControls.leftButton.addEventListener('touchend', function () {
    airfighter.isKeyLeftPressed = false
  })
  mobileControls.rightButton.addEventListener('touchend', function () {
    airfighter.isKeyRightPressed = false
  })
  mobileControls.topButton.addEventListener('touchend', function () {
    airfighter.isKeyUpPressed = false
  })
  mobileControls.bottomButton.addEventListener('touchend', function () {
    airfighter.isKeyDownPressed = false
  })
  mobileControls.fireButton.addEventListener('touchstart', function () {
    controls.push('r')
  })
  mobileControls.fireButton.addEventListener('touchend', function () {
    controls.splice(controls.indexOf('r'), 1)
  })
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
