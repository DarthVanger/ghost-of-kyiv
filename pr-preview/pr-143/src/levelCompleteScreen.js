export const levelCompleteScreen = document.createElement('div')

levelCompleteScreen.innerHTML = `
  <h2>Level Complete!</h2>
  <br /><br /><button id="nextLevel" type="button">Next level</button><br />
  <img src="img/level_complete_animation.gif" />
`
levelCompleteScreen.id = "levelComplete"