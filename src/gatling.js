import {airfighter} from "./airfighter.js";

import { soundGatling} from "./music.js";

export let gatling = {
  velocity: -2,
  ammo: 1500,
  dmg: 10,
  element: document.querySelector("#gatling"),
};

export let bulletArray = []

function createBullet() {
  const bullet = {}
  bullet.element = document.createElement('img')
  bullet.element.src = 'img/Bullet_h100px.png'
  bullet.element.className = 'bullet'
  bullet.element.style.width = '20px'
  document.body.append(bullet.element)
  bullet.velocity = 12
  bullet.x = airfighter.x + airfighter.width + (Math.random()* 4)
  bullet.y = airfighter.y + airfighter.height/2
  bullet.margin = Math.random()*(3)-(1.5)
  gatling.ammo -= 10;
  bulletArray.push(bullet)
}

export function removeBullet(bullet) {
  bullet.element.remove()
  bulletArray = bulletArray.filter(anotherBullet => anotherBullet !== bullet)
}

export function fireGatlingEnemy() {
  if (gatling.ammo > 0) {
    if (bulletArray.length < 10) {
      createBullet()
      soundGatling.play();
    }
  }
}

export function addGatling(enemy) {
  document.querySelector('#game-background').addEventListener('click', fireGatlingEnemy);
  enemy.element.addEventListener('click', fireGatlingEnemy);
  document.querySelector('#airfighter').addEventListener('click', fireGatlingEnemy);
}

export function moveBullet(bullet) {
  bullet.x += bullet.velocity
  bullet.y += bullet.margin
  bullet.element.style.left = bullet.x + 'px'
  bullet.element.style.top = bullet.y + 'px'
}