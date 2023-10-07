export function setAirfighterVelocityFromMobileJoystick(
  airfighter,
  isMobileDevice
) {
  if (isMobileDevice.x < 0) {
    airfighter.isKeyLeftPressed = true
    airfighter.vx *= isMobileDevice.x * -1
  } else if (isMobileDevice.x > 0) {
    airfighter.isKeyRightPressed = true
    airfighter.vx *= isMobileDevice.x
  } else {
    airfighter.isKeyRightPressed = false
    airfighter.isKeyLeftPressed = false
  }

  if (isMobileDevice.y < 0) {
    airfighter.isKeyUpPressed = true
    airfighter.vy *= isMobileDevice.y * -1
  } else if (isMobileDevice.y > 0) {
    airfighter.isKeyDownPressed = true
    airfighter.vy *= isMobileDevice.y
  } else {
    airfighter.isKeyUpPressed = false
    airfighter.isKeyDownPressed = false
  }
}
