import { rocket } from './rocket.js'
import { airfighter } from './player/Player.js'
import { deleteEnemies, createEnemies, enemies } from './enemy.js'
import {
  soundMainTheme,
  soundIntro,
  soundLevelComplete,
  soundboss,
} from './music.js'
import { Step, gameState, fps } from './step.js'
import { resetAmmo } from './ammo.js'
import { level3Boss, createBoss } from './Boss.js'
import { bossPopup } from './rendering/Helpers.js'
import { resetBackground } from './background.js'
import { initKeybordMovement } from './keyboard.js'
import { levelCompleteScreen } from './levelCompleteScreen.js'

let isGameStarted = false
let introduction = document.querySelector('#introduction')
introduction.addEventListener('click', introductionSkip)
const levelEnemies = 11
const levelState = {
  isLevelFinished: false,
  levelNumber: 0,
}

export function startGame() {
  console.log(`startGame, level :${levelState.levelNumber}`)
  initKeybordMovement()
  if (levelState.levelNumber == 1) {
    startLevel1()
  }
  if (levelState.levelNumber == 2) {
    startLevel2()
  }
  if (levelState.levelNumber == 3) {
    startLevel3()
  }
  if (levelState.levelNumber == 4) {
    levelState.levelNumber = 1
    startLevel1()
  }
}

function changeLevel() {
  isGameStarted = false
  soundLevelComplete.pause()
  document
  levelCompleteScreen.addEventListener('click', showIntroductionAndSetNewText)
}

function showIntroductionAndSetNewText() {
  introduction.style.display = 'block'
  introduction.style.zIndex = 3
  soundMainTheme.play()
  if (levelState.levelNumber == 1) {
    document.querySelector('#episode').innerHTML = 'EPISODE II'
    document.querySelector('#backstoryEpisode').innerHTML =
      'The battle for the borders of Gostomel'
  }
  if (levelState.levelNumber == 2) {
    soundMainTheme.pause()
    soundboss.play()
    document.querySelector('#episode').innerHTML = 'EPISODE III'
    document.querySelector('#backstoryEpisode').innerHTML = 'Helicopter Boss'
  }
}

function introductionSkip() {
  if (!isGameStarted) {
    soundMainTheme.play()
    introduction.style.display = 'none'
    introduction.style.zIndex = -1
    soundIntro.pause()
    levelState.levelNumber += 1
    startGame()
    isGameStarted = true
  }
}

function startLevel1() {
  soundMainTheme.play()
  createEnemies(levelEnemies)
  gameState.gameIntervalId = setInterval(Step, 1000 / fps)
  isGameStarted = false
}

function startLevel2() {
  airfighter.moveToInitalPosition()
  airfighter.resetLife()
  rocket.moveToInitialPosition()
  clearInterval(gameState.gameIntervalId)
  isGameStarted = false
  deleteEnemies()
  createEnemies(levelEnemies)
  resetAmmo(1500, 10)
  resetBackground()
  gameState.gameIntervalId = setInterval(Step, 1000 / fps)
  levelCompleteScreen.remove()
  introduction.style.display = 'block'
}

function startLevel3() {
  airfighter.moveToInitalPosition()
  airfighter.resetLife()
  rocket.moveToInitialPosition()
  clearInterval(gameState.gameIntervalId)
  isGameStarted = false
  deleteEnemies()
  bossPopup()
  createBoss()
  soundMainTheme.pause()
  enemies.push(level3Boss)
  resetAmmo(2000, 12)
  resetBackground()
  levelCompleteScreen.remove()
  introduction.style.display = 'block'
  gameState.gameIntervalId = setInterval(Step, 1000 / fps)
}

levelCompleteScreen
  .querySelector('#nextlevel')
  .addEventListener('click', changeLevel)

export function endGameAction() {
  document.location.reload()
}
