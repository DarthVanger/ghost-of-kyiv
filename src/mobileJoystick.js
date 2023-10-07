// Create an SVG element
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
const innerCircle = document.createElementNS(
  'http://www.w3.org/2000/svg',
  'circle'
)

// Set the width as a percentage of the screen size
const screenWidth = window.innerWidth
const svgWidth = (20 / 100) * screenWidth
const joystickRadius = svgWidth / 2
const joystickNippleRadius = svgWidth / 8

export const mobileJoystick = {
  isMobileDevice: false,
  x: 0,
  y: 0,
  left: false,
  right: false,
  up: false,
  down: false,
}

export function createJoystick() {
  svg.setAttribute('width', svgWidth)

  // Set the viewBox to match the width and maintain aspect ratio
  svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgWidth}`)

  // Set the position to left bottom corner
  svg.style.position = 'fixed'
  svg.style.left = '5%'
  svg.style.bottom = '10%'

  // Create a circle element
  const circle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  )
  circle.setAttribute('cx', joystickRadius)
  circle.setAttribute('cy', joystickRadius)
  circle.setAttribute('r', joystickRadius)
  circle.setAttribute('fill', 'lightgray')
  circle.setAttribute('fill-opacity', 0.2)

  innerCircle.setAttribute('cx', joystickRadius)
  innerCircle.setAttribute('cy', joystickRadius)
  innerCircle.setAttribute('r', joystickNippleRadius)
  innerCircle.setAttribute('fill-opacity', 0.7)

  // Append the circle element to the SVG element
  svg.appendChild(circle)
  svg.appendChild(innerCircle)
  // Append the SVG element to the document body
  document.body.appendChild(svg)
  mobileJoystick.isMobileDevice = true
}

svg.addEventListener('touchmove', function (event) {
  const touchX = event.changedTouches[0].clientX
  const touchY = event.changedTouches[0].clientY

  let svgBoundingRect = svg.getBoundingClientRect()
  let xInsideSvg = touchX - svgBoundingRect.left
  let yInsideSvg = touchY - svgBoundingRect.top

  let distanceFromCenterX = xInsideSvg - joystickRadius
  let distanceFromCenterY = yInsideSvg - joystickRadius

  let maxDistance = joystickRadius - joystickNippleRadius
  let distanceToCenter = Math.sqrt(
    distanceFromCenterX * distanceFromCenterX +
      distanceFromCenterY * distanceFromCenterY
  )
  if (distanceToCenter < joystickRadius - joystickNippleRadius) {
    innerCircle.setAttribute('cx', xInsideSvg)
    innerCircle.setAttribute('cy', yInsideSvg)

    mobileJoystick.x = distanceFromCenterX / maxDistance
    mobileJoystick.y = distanceFromCenterY / maxDistance
  } else {
    const scaleFactor = maxDistance / distanceToCenter
    distanceFromCenterX *= scaleFactor
    distanceFromCenterY *= scaleFactor
    distanceToCenter = Math.sqrt(
      distanceFromCenterX * distanceFromCenterX +
        distanceFromCenterY * distanceFromCenterY
    )

    innerCircle.setAttribute('cx', distanceFromCenterX + joystickRadius)
    innerCircle.setAttribute('cy', distanceFromCenterY + joystickRadius)

    mobileJoystick.x = distanceFromCenterX / maxDistance
    mobileJoystick.y = distanceFromCenterY / maxDistance
  }
  innerCircle.setAttribute('fill-opacity', 0.4)
})

svg.addEventListener('touchend', function (event) {
  mobileJoystick.x = 0
  mobileJoystick.y = 0
  innerCircle.setAttribute('cx', joystickRadius)
  innerCircle.setAttribute('cy', joystickRadius)
  innerCircle.setAttribute('fill-opacity', 0.7)
})
