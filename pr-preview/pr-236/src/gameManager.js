import { deleteEnemies } from './enemy.js'
import { createEnemies } from './enemyManager.js'
import {
  soundMainTheme,
  soundIntro,
  soundLevelComplete,
  soundboss,
} from './music.js'
import { Step, fps } from './step.js'
import { resetAmmo } from './ammo.js'
import { createBoss, changeWinText } from './Boss.js'
import { bossPopup } from './rendering/Helpers.js'
import { resetBackground } from './background.js'
import { initKeybordMovement } from './keyboard.js'
import { levelCompleteScreen } from './levelCompleteScreen.js'
import { gameState } from './gameState.js'
import { Player } from './player/Player.js'

let isGameStarted = false
let introduction = document.querySelector('#introduction')
introduction.addEventListener('click', introductionSkip)
const levelEnemies = 15
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
    document.querySelector('#episode').innerHTML = 'EPISODE II<br />Bucha'
    document.querySelector('#backstoryEpisode').innerText =
      'The battle for the Bucha'
    document.querySelector('#textEpisode').innerText = `
      In war-torn Bucha, a mysterious force emerges — the Ghost of Kyiv. Neither alive nor dead, it silently moves through the devastated streets, offering solace and hope. This spectral guardian becomes a symbol of courage, fighting for both the safety and spirit of the people. Can the Ghost change the course of war and inspire a resilient future? The story unfolds in the shadows, a testament to the enduring strength of the human spirit.
    `
  }
  if (levelState.levelNumber == 2) {
    soundMainTheme.pause()
    soundboss.play()
    document.querySelector('#episode').innerHTML = 'EPISODE III<br /> Irpin'
    document.querySelector('#backstoryEpisode').innerText = 'Echoes of Irpin'
    document.querySelector('#textEpisode').innerText = `
      In the quiet town of Irpin, tranquility shattered as the echoes of conflict reached its streets. Amidst the turmoil, a silent guardian emerged — the Echo of Irpin. Unseen yet deeply felt, this mysterious presence moved through the town, offering solace and strength.

      As the people of Irpin faced the harsh realities of war, the Echo became a symbol of resilience. With every step, it whispered tales of hope and courage, a spectral force standing in quiet defiance against the darkness that threatened to consume the town.

      Through the haunting landscapes of Irpin, the Echo navigated, leaving a trail of inspiration in its wake. Can this spectral guardian be the beacon of light needed to guide Irpin through its darkest hours?

    `
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
  startAnimationFrame()
}

function startLevel2() {
  resetLevel()
  createEnemies(levelEnemies)
  startAnimationFrame()
  introduction.style.display = 'block'
  const bgFront = document.querySelector('#bg-front')
  const bgMiddle = document.querySelector('#bg-middle')
  const bgBack = document.querySelector('#bg-back')
  bgFront.classList.add('bg-bucha')
  bgMiddle.classList.add('bg-bucha')
  bgBack.src = '../img/parallax-background-bucha.png'
}

function startAnimationFrame() {
  gameState.isGamePaused = false
  requestAnimationFrame(Step)
}

function startLevel3() {
  resetLevel()
  bossPopup()
  new createBoss()
  changeWinText()
  soundMainTheme.pause()
  introduction.style.display = 'block'
  startAnimationFrame()
}

function resetLevel() {
  gameState.airfighter.moveToInitalPosition()
  gameState.airfighter.resetLife()
  deleteEnemies()
  resetAmmo(2000)
  resetBackground()
  levelCompleteScreen.remove()
  isGameStarted = false
}

levelCompleteScreen
  .querySelector('#nextlevel')
  .addEventListener('click', changeLevel)

export function endGameAction() {
  document.location.reload()
}
