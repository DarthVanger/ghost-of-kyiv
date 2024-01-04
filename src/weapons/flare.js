import { gameState } from '../gameState.js'

export let flareAmmo = 10
const flameCooldown = 200

class Flare {
  x = 80
  y = 70
  radius = 120
  velocity = 8
  element = document.createElement('div')
  numFlames = 10
  flames = []
  speedX = -2
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
        vx: this.speedX,
        vy: 0, //this.speedY - Math.random() * this.speedY - 3,
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
      flame.vx *= 0.995
      flame.vy += 0.25
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
