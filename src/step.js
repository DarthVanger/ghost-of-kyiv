import { renderCurrentScore } from './scores/currentGameScore.js'
import { handleCollisions } from './collisions/collisions.js'
import { updateEnemy } from './enemy/enemy.js'
import {
  renderRocket,
  moveRocket,
  deleteUselessEnemyRockets,
} from './weapons/rocket.js'
import { bulletArray, moveBullet } from './weapons/gatling.js'
import { moveBackground } from './background.js'
import { levelOverIfLastEnemyOut, gameOver } from './gameOver.js'
import { renderAmmo } from './ammo.js'
import { mobileJoystick } from './mobileJoystick.js'
import { setAirfighterVelocityFromMobileJoystick } from './mobile/mobileVelocityController.js'
import { gameState } from './gameState.js'

export const fps = 60
const frameDurationMs = 1000 / fps

let lastTimestamp = 0
let accumulatorMs = 0
let isLoopRunning = false

export function Step() {
  renderCurrentScore()
  const airfighter = gameState.airfighter

  gameState.enemies.forEach(updateEnemy)
  bulletArray.forEach(moveBullet)
  moveRocket()
  renderAmmo()
  moveBackground(airfighter)

  renderRocket()
  airfighter.render()

  if (mobileJoystick.isMobileDevice) {
    setAirfighterVelocityFromMobileJoystick(airfighter, mobileJoystick)
  }

  const lastEnemy = gameState.enemies[gameState.enemies.length - 1]
  if (lastEnemy) {
    levelOverIfLastEnemyOut(lastEnemy, gameState)
  }

  deleteUselessEnemyRockets()

  gameState.playerFlares.forEach((flare) => {
    flare.render()
  })

  handleCollisions()
  playerDiesIfHpBelowZiro()
}

function gameLoop(timestamp) {
  if (gameState.isGamePaused || gameState.isGameOver) {
    isLoopRunning = false
    lastTimestamp = 0
    accumulatorMs = 0
    return
  }

  if (!lastTimestamp) {
    lastTimestamp = timestamp
  }

  let delta = timestamp - lastTimestamp

  if (delta > 1000) {
    delta = frameDurationMs
  }

  lastTimestamp = timestamp
  accumulatorMs += delta

  while (accumulatorMs >= frameDurationMs) {
    Step()
    accumulatorMs -= frameDurationMs
  }

  requestAnimationFrame(gameLoop)
}

export function startGameLoop() {
  if (isLoopRunning) {
    return
  }

  isLoopRunning = true
  lastTimestamp = 0
  accumulatorMs = 0
  requestAnimationFrame(gameLoop)
}

function playerDiesIfHpBelowZiro() {
  if (gameState.airfighter.health.element.value <= 0) {
    if (!gameState.isGameOver) {
      gameOver()
    }
  }
}
