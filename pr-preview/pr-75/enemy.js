import {enemyHealth50, enemyHealth100, enemyHealth200, enemyHealth50text, enemyHealth100text, enemyHealth200text} from "./health.js";

  let enemy1 = {
    isAlive : true,
    x: 600 + Math.floor(Math.random()*400) ,
    y: Math.floor(Math.random()*(innerHeight-80))/2,
    width: 250,
    height: 80,
    velocity: -2,
    enemyHealth: enemyHealth50,
    enemyHealthText: enemyHealth50text,
    element: document.querySelector("#enemy1"),
  };
  

  let enemy2 = {
    isAlive : true,
    x: 1200 + Math.floor(Math.random()*800),
    y:  Math.floor(Math.random()*(innerHeight-100)),
    width: 270,
    height: 100,
    velocity: -2,
    enemyHealth: enemyHealth100,
    enemyHealthText: enemyHealth100text,
    element: document.querySelector("#enemy21"),
  };
  
  let enemy3 = {
    isAlive : true,
    x: 2300 + Math.floor(Math.random()*400),
    y:  Math.floor(Math.random()*(innerHeight-200)),
    width: 330,
    height: 200,
    velocity: -2,
    enemyHealth: enemyHealth200,
    enemyHealthText: enemyHealth200text,
    element: document.querySelector("#enemy3"),
  };

  export let enemies = [enemy1, enemy2, enemy3];
