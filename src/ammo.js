import { gatling } from './gatling.js'
import { rocket } from './rocket.js'

export function resetAmmo(bullets, rockets) {
  gatling.ammo = bullets
  rocket.ammo = rockets
}
