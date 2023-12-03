export let soundIntro = new Audio()
export let soundGatling = new Audio()
export let soundRocketShot = new Audio()
export let soundRocketHit = new Audio()
export let soundEnemyDieExplosion = new Audio()
export let soundGameOver = new Audio()
export let soundMainTheme = new Audio()
export let soundLevelComplete = new Audio()
export let soundboss = new Audio()

let randomIntroMusic = Math.round(Math.random() * 2)
let soundIntroArray = [
  './music/soundIntro.mp3',
  './music/soundIntro2.mp3',
  './music/soundIntro3.mp3',
]
soundIntro.src = soundIntroArray[randomIntroMusic]
soundGatling.src = 'music/soundGatling.mp3'
soundRocketShot.src = 'music/soundRocketShot.mp3'
soundRocketHit.src = 'music/soundRocketHit.mp3'
soundEnemyDieExplosion.src = 'music/soundEnemyDieExplosion.mp3'
soundGameOver.src = 'music/soundGameOver.mp3'
soundMainTheme.src = 'music/soundMainTheme.mp3'
soundLevelComplete.src = 'music/soundLevelComplete.mp3'
soundboss.src = 'music/boss.mp3'

soundIntro.volume = 0.5
soundGatling.volume = 0.3
soundRocketShot.volume = 0.4
soundRocketHit.volume = 0.5
soundEnemyDieExplosion.volume = 0.5
soundGameOver.volume = 0.3
soundMainTheme.volume = 0.5
soundLevelComplete.volume = 0.1
soundboss.volume = 1
