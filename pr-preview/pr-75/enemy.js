export let enemy1 = {
    x: 600 + Math.floor(Math.random()*400) ,
    y: Math.floor(Math.random()*(innerHeight-80))/2,
    width: 250,
    height: 80,
    velocity: -2,
    element: document.querySelector("#enemy1"),
  };
  
export let enemy2 = {
    x: 1200 + Math.floor(Math.random()*800),
    y :  Math.floor(Math.random()*(innerHeight-100)),
    width: 270,
    height: 100,
    velocity: -2,
    element: document.querySelector("#enemy21"),
  };
  
export let enemy3 = {
    x: 2300 + Math.floor(Math.random()*400),
    y:  Math.floor(Math.random()*(innerHeight-200)),
    width: 330,
    height: 200,
    velocity: -2,
    element: document.querySelector("#enemy3"),
  };