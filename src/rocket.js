export let rocket = {
  x: 80,
  y: 70,
  width: 120,
  ammo: 10,
  dmg: 50,
  velocity: 0,
  element: document.querySelector("#rocket"),
};

export function renderRocket() {
  rocket.element.style.left = rocket.x;
  rocket.element.style.top = rocket.y;
}

export function moveRocket() {
  rocket.x += rocket.velocity;
}
