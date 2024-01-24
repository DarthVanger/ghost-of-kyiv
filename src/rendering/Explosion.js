export let explosion = document.createElement('img')
explosion.id = 'explosion-' + new Date()
explosion.className = 'explosion'
explosion.src = './img/explosion.gif'
explosion.width = 120
explosion.height = 130

export function explosionEffect(airplane) {
  document.querySelector('#gifContainerExplosion').append(explosion)
  explosion.style.left = airplane.x + airplane.width / 2 - explosion.width / 2
  explosion.style.top = airplane.y + airplane.height / 2 - explosion.height / 2
  setTimeout(() => {
    explosion.remove()
  }, 700)
}
