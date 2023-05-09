export let airfighter = {
  x: 0,
  y: 0,
  width: 250,
  height: 80,
  element: document.querySelector('#airfighter'),
  health: {
    x: 0,
    y: 0,
    element: document.querySelector("#playerHealth")
  },
  healthtext: {
    x: 0,
    y: 0,
    element: document.querySelector("#playerHealthText")
  },
  rocketDefaultX: 5,
  rocketDefaultY: 67,
  rocketMaxDistance: 1500,
  isShipMovingUp: false,
  isShipMovingLeft: false,
  isShipMovingRight: false,
  isShipMovingDown: false,
  };

export function renderShip() {
  airfighter.element.style.left = airfighter.x;
  airfighter.element.style.top = airfighter.y;
  airfighter.health.element.style.left = airfighter.x;
  airfighter.health.element.style.top = airfighter.y;
  airfighter.health.element.style.width = airfighter.width;
  airfighter.health.element.style.height = airfighter.height*0.1;
  airfighter.healthtext.element.value = airfighter.health.element.value / airfighter.health.element.max;
  airfighter.healthtext.element.innerHTML = `${airfighter.health.element.value} / ${airfighter.health.element.max} HP`;
  airfighter.healthtext.element.style.left = airfighter.x;
  airfighter.healthtext.element.style.top = airfighter.y - 35;
  airfighter.healthtext.element.style.width = airfighter.width;
}
