import {enemyHealth50, enemyHealth100, enemyHealth200, enemyHealth50text, enemyHealth100text, enemyHealth200text} from "./health.js";
import {airfighter} from "./airfighter.js";
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
        enemy.x -= enemyDies;
        soundEnemyDieExplosion.play();
      }
    }
  }
