export const deadEnemyXPosition = -9999
export const rocketDefaultX = 80
export const rocketDefaultY = 70

export function bossPopup() {
  let popup = document.createElement('div')
  popup.id = 'bossPopup'
  popup.innerHTML = 'THE BOSS IS COMING!!!'
  document.querySelector('#game-background').append(popup)
  setTimeout(() => {deletePopup(popup)}, 3000)
}
function deletePopup(popup) {
    popup.remove()
}   