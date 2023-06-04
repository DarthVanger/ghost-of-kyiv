import { gatling } from "./gatling.js";
import { rocket } from "./rocket.js"; 

export function resetAmmo() {
    gatling.ammo = 1500
    rocket.ammo = 10
}