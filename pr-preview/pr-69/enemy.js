import {enemyHealth50, enemyHealth100, enemyHealth200, enemyHealth50text, enemyHealth100text, enemyHealth200text} from "./health.js";

  let enemy1 = {
    isAlive : true,
    x: 800,
    y: 100,
    width: 250,
    height: 80,
    vx: -2,
    vy: 0,
    velocity: -2,
    enemyHealth: enemyHealth50,
    enemyHealthText: enemyHealth50text,
    element: document.querySelector("#enemy1"),
  };
  
  let enemy2 = {
    isAlive : true,
    x: 1400,
    y: 350,
    width: 270,
    height: 100,
    vx: -2,
    vy: 0,
    velocity: -2,
    enemyHealth: enemyHealth100,
    enemyHealthText: enemyHealth100text,
    element: document.querySelector("#enemy21"),
  };
  
  let enemy3 = {
    isAlive : true,
    x: 1900,
    y: 250,
    width: 330,
    height: 200,
    vx: -2,
    vy: 0,
    velocity: -2,
    enemyHealth: enemyHealth200,
    enemyHealthText: enemyHealth200text,
    element: document.querySelector("#enemy3"),
  };

  export let enemies = [enemy1, enemy2, enemy3];
