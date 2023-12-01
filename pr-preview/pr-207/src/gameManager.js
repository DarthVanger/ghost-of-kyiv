import { deleteEnemies, createEnemies, enemies } from './enemy.js'
import {
  soundMainTheme,
  soundIntro,
  soundLevelComplete,
  soundboss,
} from './music.js'
import { Step, fps } from './step.js'
import { resetAmmo } from './ammo.js'
import { level3Boss, createBoss, changeWinText } from './Boss.js'
import { bossPopup } from './rendering/Helpers.js'
import { resetBackground } from './background.js'
import { initKeybordMovement } from './keyboard.js'
import { levelCompleteScreen } from './levelCompleteScreen.js'
import { gameState } from './gameState.js'
import { Player } from './player/Player.js'

let isGameStarted = false
let introduction = document.querySelector('#introduction')
introduction.addEventListener('click', introductionSkip)
const levelEnemies = 11
const levelState = {
  isLevelFinished: false,
  levelNumber: 0,
}

export function startGame() {
  gameState.airfighter = new Player()

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
    introduction.style.zIndex = -1
    soundIntro.pause()
    levelState.levelNumber += 1
    startGame()
    introduction.style.display = 'none'
    isGameStarted = true
  }
}

function startLevel1() {
  resetLevel()
  soundMainTheme.play()
  createEnemies(levelEnemies)
  gameState.gameIntervalId = setInterval(Step, 1000 / fps)
}

function startLevel2() {
  resetLevel()
  createEnemies(levelEnemies)
  gameState.gameIntervalId = setInterval(Step, 1000 / fps)
  introduction.style.display = 'block'

  const bgMiddle = document.querySelector('#bg-middle')
  bgMiddle.classList.add('bg-bucha')
}

function startLevel3() {
  resetLevel()
  bossPopup()
  createBoss()
  changeWinText()
  soundMainTheme.pause()
  enemies.push(level3Boss)
  introduction.style.display = 'block'
  gameState.gameIntervalId = setInterval(Step, 1000 / fps)
}

function resetLevel() {
  gameState.airfighter.moveToInitalPosition()
  gameState.airfighter.resetLife()
  deleteEnemies()
  resetAmmo(2000)
  resetBackground()
  levelCompleteScreen.remove()
  gameState.isGamePaused = false
  isGameStarted = false
  clearInterval(gameState.gameIntervalId)
}

levelCompleteScreen
  .querySelector('#nextlevel')
  .addEventListener('click', changeLevel)

export function endGameAction() {
  document.location.reload()
}
