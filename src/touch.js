import { createJoystick } from './mobileJoystick.js'
export const mobileControls = {
  fireButton: document.querySelector('.fire'),
}

let checkDevice = navigator.userAgent
const viewport = document.querySelector('#viewport')
const keyboardControlsHelpElement = document.querySelector('#keyboard-controls-help')

if (
  navigator.userAgent.match('iPhone') ||
  navigator.userAgent.match('Android') ||
  navigator.userAgent.match('iPad') ||
  navigator.userAgent.match('RIM')
) {
  document.body.classList.add('_touch')

  keyboardControlsHelpElement.innerHTML = `
    <br><br>
    Use the bottom left joystick to move around.<br><br>
    Use the gray in the lower right corner to launch a rocket.<br><br>
    Click on an enemy to launch a bullet.
  `

  createJoystick()
  if (window.orientation === 0) {
    viewport.setAttribute(
      'content',
      'width=900, initial-scale=0.3, max-scale=0.3, user-scalable=no'
    )
  }
}

document.querySelectorAll('*').forEach((e) => {
  e.setAttribute('draggable', false)
})
