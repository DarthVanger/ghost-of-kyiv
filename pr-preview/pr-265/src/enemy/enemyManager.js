import * as factory from './enemyFactory.js'
import { gameState } from '../gameState.js'
import { addGatling } from '../weapons/gatling.js'

export function createEnemies(maxEnemies) {
  for (let i = 0; i < maxEnemies; i++) {
    let enemy
    if (i < 3) {
      enemy = factory.createSu3(i)
    } else if (i >= 3 && i <= 6) {
      enemy = factory.createZrkTor(i)
    } else if (i >= 7 && i <= 9) {
      enemy = factory.createSu35(i)
    } else if (i >= 10 && i <= 12) {
      enemy = factory.createZ10(i - 3)
    } else {
      enemy = factory.createSu27(i)
    }
    enemy.createRocket(enemy)

    addGatling(enemy)
    document.body.append(enemy.element)
    gameState.enemies.push(enemy)
  }
}
