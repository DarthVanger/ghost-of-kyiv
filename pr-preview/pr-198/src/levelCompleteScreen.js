export const levelCompleteScreen = document.createElement('div')

const levelCompleteScreenText = `
  <h2>Level Complete!</h2>
  <br /><br /><button id="nextLevel" type="button">Next level</button><br />
  <img src="img/level_complete_animation.gif" />
`
levelCompleteScreen.innerHTML = levelCompleteScreenText

levelCompleteScreen.id = 'levelComplete'

export let bossCompleteScreenText = `<br /><h2>Boss Defeated</h2>
<br /><br /><button id="nextLevel" type="button">Next level</button><br />
<img src="img/bossDefeated.gif" />`
