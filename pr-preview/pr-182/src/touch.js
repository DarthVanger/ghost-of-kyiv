import {createJoystick} from './mobileJoystick.js'
export const mobileControls = {
  
  fireButton: document.querySelector('.fire'),
}

let checkDevice = navigator.userAgent
const viewport = document.querySelector('#viewport')
let touch = document.querySelector('#keyboard-controls-help')

if (
  navigator.userAgent.match('iPhone') ||
  navigator.userAgent.match('Android') ||
  navigator.userAgent.match('iPad') ||
  navigator.userAgent.match('RIM')
) {
  document.body.classList.add('_touch')
  touch.style.display = 'none'
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
