import {airfighter} from "./airfighter.js";
import { explosion } from "./enemy.js";

import {soundEnemyDieExplosion, soundGatling} from "./music.js";

export const enemyDies = 9999;

export let gatling = {
  velocity: -2,
  ammo: 1500,
  dmg: 10,
  element: document.querySelector("#gatling"),
};

export function fireGatlingEnemy (event, enemy) {  
    if (airfighter.x + airfighter.width < event.pageX ) { 
      enemy.enemyHealth.element.value -= gatling.dmg;
      gatling.ammo -= 10;
      soundGatling.play();
      if (enemy.enemyHealth.element.value === 0) {
        document.querySelector('#gifContainer').append(explosion);
        explosion.style.left = enemy.x;
        explosion.style.top = enemy.y;
        soundEnemyDieExplosion.play();
        setTimeout(() => {
          explosion.remove()
        },700)
      }
    }
  }

export function addGatling (enemy) {
  function handleEnemyClick (event) {
    fireGatlingEnemy(event, enemy);
  }
  enemy.element.addEventListener('click', handleEnemyClick);
}
