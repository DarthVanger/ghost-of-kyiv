
export function setAirfighterVelocityFromMobileJoystick(
  airfighter,
  mobileJoystick
) {
  if (mobileJoystick.x < 0) {
    airfighter.isKeyLeftPressed = true
    airfighter.vx *= mobileJoystick.x * -1
  } else if (mobileJoystick.x > 0) {
    airfighter.isKeyRightPressed = true
    airfighter.vx *= mobileJoystick.x
  } else {
    airfighter.isKeyRightPressed = false
    airfighter.isKeyLeftPressed = false
  }

  if (mobileJoystick.y < 0) {
    airfighter.isKeyUpPressed = true
    airfighter.vy *= mobileJoystick.y * -1
  } else if (mobileJoystick.y > 0) {
    airfighter.isKeyDownPressed = true
    airfighter.vy *= mobileJoystick.y
  } else {
    airfighter.isKeyUpPressed = false
    airfighter.isKeyDownPressed = false
  }
}
