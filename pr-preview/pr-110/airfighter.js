export let airfighter = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
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