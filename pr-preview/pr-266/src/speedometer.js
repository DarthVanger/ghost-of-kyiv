export const speedometer = document.createElement('div')
speedometer.id = 'speedometer'

const vxElement = document.createElement('div')
vxElement.innerHTML = 'VX: 0'

const vyElement = document.createElement('div')
vyElement.innerHTML = 'VY: 0'

const axElement = document.createElement('div')
axElement.innerHTML = 'AX: 0'

speedometer.append(vxElement)
speedometer.append(vyElement)
speedometer.append(axElement)

export function updateSpeedometer(vx, ax, vy) {
  vxElement.innerHTML = `VX: ${vx}`
  axElement.innerHTML = `AX: ${ax}`
  vyElement.innerHTML = `VY: ${vy}`
}
