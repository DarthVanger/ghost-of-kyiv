import { gameState } from '../gameState.js'

export let flareAmmo = 10
const flameCooldown = 15

class Flare {
  x = 80
  y = 70
  radius = 120
  element = document.createElement('div')
  numFlames = 6
  flames = []
  g = 1
  speedX = 20
  speedY = 10

  constructor() {
    this.element.className = 'flare'

    for (let i = 0; i < this.numFlames; i++) {
      setTimeout(launchFlame.bind(this), i * flameCooldown)
    }

    function launchFlame() {
      const flame = {
        x: gameState.airfighter.x + airfighter.width / 4,
        y: gameState.airfighter.y + airfighter.height / 2,
        vx: this.speedX * (Math.random() + 0.25),
        vy: this.speedY * (Math.random() - 0.25),
        element: document.createElement('img'),
      }
      flame.element.className = 'flare-flame'
      flame.element.src = 'img/flare-flame.gif'
      document.body.append(flame.element)

      this.flames.push(flame)
    }
  }

  render() {
    this.flames.forEach((flame) => {
      flame.vx -= 0.5
      flame.vy += 0.1
      flame.x += flame.vx
      flame.y += flame.vy
      flame.element.style.left = flame.x
      flame.element.style.top = flame.y
    })
  }
}

export function createPlayerFlare(airfighter) {
  if (flareAmmo > 0) {
    let flare = new Flare()
    gameState.playerFlares.push(flare)
    flare.x = airfighter.x + airfighter.width / 4
    flare.y = airfighter.y + airfighter.height / 2

    document.body.append(flare.element)
    //rockets.push(rocket)
    flareAmmo -= 1
  }
}
