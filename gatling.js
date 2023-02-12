import {enemyHealth50, enemyHealth100, enemyHealth200, enemyHealth50text, enemyHealth100text, enemyHealth200text} from "./health.js";
import {airfighter} from "./airfighter.js";
import {enemy1, enemy2, enemy3} from './enemy.js';

export const enemyDies = 9999;

export let gatling = {
  x: 0,
  y: 0,
  velocity: -2,
  ammo: 1500,
  dmg: 10,
  element: document.querySelector("#gatling"),
};

export function fireGatlingEnemyOne (event) {  
    if (airfighter.x + airfighter.width < event.pageX ) { 
      healthBar50.value -= gatling.dmg;
      gatling.ammo -= 10;
      if (healthBar50.value === 0) {
        enemy1.x -= enemyDies;
      }
    }
  }
  
  export function fireGatlingEnemyTwo (event) { 
    if (airfighter.x + airfighter.width < event.pageX ) {
      enemyHealth100.element.value -= gatling.dmg;
      gatling.ammo -= 10;
      if (enemyHealth100.element.value === 0) {
        console.log('enemy2');
        console.log(enemy2);
        enemy2.x -= enemyDies;
      }
    }
   }
  
   export function fireGatlingEnemyThree (event) {
    if (airfighter.x + airfighter.width < event.pageX ) {
      healthBar200.value -= gatling.dmg;
      gatling.ammo -= 10;
      if (healthBar200.value === 0) {
        enemy3.x -= enemyDies;
      }
    }
  }