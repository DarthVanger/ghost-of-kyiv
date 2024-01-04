import { Enemy } from './enemy.js'
import { addGatling } from '/src/weapons/gatling.js'
import {
  createRocket,
  updateEnemyRocketAtack,
  updateEnemyGroundAtack,
} from '/src/weapons/enemyRocketAtack.js'
import { createTargetedRocket } from '/src/weapons/groundEnemyAttack.js'
import {
  manoeuvreUpAtHalfScreen,
  manoeuvreDownAtHalfScreen,
  manoeuvreZigzagAtQuarterScreen,
  manoeuvreStraightFast,
  manoeuvreOnGround,
} from './enemyManoeuvre.js'

export function createSu3(i) {
  return new Enemy({
    src: 'img/su-3.png',
    width: 250,
    height: 80,
    i,
    maxHealth: 50,
    manoeuvre: manoeuvreUpAtHalfScreen,
    attack: updateEnemyRocketAtack,
    createRocket,
  })
}

export function createSu27(i) {
  return new Enemy({
    src: 'img/su-27.png',
    width: 270,
    height: 100,
    i,
    maxHealth: 100,
    manoeuvre: manoeuvreDownAtHalfScreen,
    attack: updateEnemyRocketAtack,
    createRocket,
  })
}

export function createZ10(i) {
  return new Enemy({
    src: 'img/z-10.png',
    width: 330,
    height: 200,
    i,
    maxHealth: 200,
    manoeuvre: manoeuvreZigzagAtQuarterScreen,
    attack: updateEnemyRocketAtack,
    createRocket,
  })
}

export function createSu35(i) {
  return new Enemy({
    src: 'img/su-35.png',
    width: 349,
    height: 91,
    i,
    maxHealth: 50,
    manoeuvre: manoeuvreStraightFast,
    attack: updateEnemyRocketAtack,
    createRocket,
  })
}

export function createZrkTor(i) {
  return new Enemy({
    src: 'img/zrk_tor.png',
    width: 349,
    height: 91,
    i,
    maxHealth: 50,
    manoeuvre: manoeuvreOnGround,
    attack: updateEnemyGroundAtack,
    createRocket: createTargetedRocket,
  })
}
