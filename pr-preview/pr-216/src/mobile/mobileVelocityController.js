export function setAirfighterVelocityFromMobileJoystick(
  airfighter,
  mobileJoystick
) {
  airfighter.vx += mobileJoystick.x
  airfighter.vy += mobileJoystick.y * 10
  if (airfighter.vx == 0) {
    airfighter.element.src = 'img/aifighter-Front.gif'
  }
  if (airfighter.vy == 0) {
    airfighter.element.src = 'img/aifighter-Front.gif'
  }
  if (airfighter.vx < -1) {
    airfighter.element.src = 'img/aifighter-Back.gif'
  }
  if (airfighter.vx > 1) {
    airfighter.element.src = 'img/aifighter-Front-Accelerate.gif'
  }
  if (airfighter.vy < -1) {
    airfighter.element.src = 'img/aifighter-Up.gif'
  }
  if (airfighter.vy > 1) {
    airfighter.element.src = 'img/aifighter-Down.gif'
  }
}

export function mobilePauseGame() {
  let pauseButton = document.querySelector('.mobile-pause');
  pauseButton.style.display = 'block';
}

