import { gameState } from '../gameState.js'

export let flareAmmo = 10
const flameCooldown = 15
const speedX = 20
const speedY = 10

class Flare {
  x = 80
  y = 70
  element = document.createElement('div')
  numFlames = 6
  g = 1

  constructor() {
    this.element.className = 'flare'
  }
}

export function createPlayerFlare(airfighter) {
  if (flareAmmo > 0) {
    const packOfFlares = createPackOfFlares(6)
    gameState.playerFlares = [...gameState.playerFlares, ...packOfFlares]

    flareAmmo -= 1
  }
}

function createPackOfFlares(numFlares) {
  const packOfFlares = []
  for (let i = 0; i < numFlares; i++) {
    const flareRadius = 100 * Math.random() + 20
    const flare = {
      x: gameState.airfighter.x + airfighter.width / 4,
      y: gameState.airfighter.y + airfighter.height / 2,
      vx: speedX * (Math.random() + 0.25),
      vy: speedY * (Math.random() - 0.25),
      element: document.createElement('img'),
      width: flareRadius,
      height: flareRadius,
      render() {
        this.vx -=  0.25
        this.x += this.vx
        this.y += this.vy
        this.element.style.left = this.x
        this.element.style.top = this.y
      },
    }

    flare.element.className = 'flare-flame'
    flare.element.src = 'img/flare.png'
    flare.element.style.width = flare.width + 'px'
    flare.element.style.height = flare.height + 'px'
    document.body.append(flare.element)

    packOfFlares.push(flare)
  }
  return packOfFlares
}

export function removePlayerFlare(flare) {
  const index = gameState.playerFlares.indexOf(flare)
  gameState.playerFlares.splice(index, 1)
  flare.element.remove()
}
