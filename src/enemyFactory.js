import { Enemy } from './enemy.js'
import { addGatling } from './weapons/gatling.js'
import {
  createRocket,
  updateEnemyRocketAtack,
  updateEnemyGroundAtack,
} from './weapons/enemyRocketAtack.js'
import { createTargetedRocket } from './weapons/groundEnemyAttack.js'
import {
  manoeuvreUpAtHalfScreen,
  manoeuvreDownAtHalfScreen,
  manoeuvreZigzagAtQuarterScreen,
  manoeuvreStraightFast,
  manoeuvreOnGround,
} from './enemyManoeuvre.js'

export function createSu3(i) {
  return new Enemy(
    'img/su-3.png',
    250,
    80,
    i,
    50,
    manoeuvreUpAtHalfScreen,
    updateEnemyRocketAtack,
    createRocket
  )
}

export function createSu27(i) {
  return new Enemy(
    'img/su-27.png',
    270,
    100,
    i,
    100,
    manoeuvreDownAtHalfScreen,
    updateEnemyRocketAtack,
    createRocket
  )
}

export function createZ10(i) {
  return new Enemy(
    'img/z-10.png',
    330,
    200,
    i,
    200,
    manoeuvreZigzagAtQuarterScreen,
    updateEnemyRocketAtack,
    createRocket
  )
}

export function createSu35(i) {
  return new Enemy(
    'img/su-35.png',
    349,
    91,
    i,
    50,
    manoeuvreStraightFast,
    updateEnemyRocketAtack,
    createRocket
  )
}

export function createZrkTor(i) {
  return new Enemy(
    'img/zrk_tor.png',
    349,
    91,
    i,
    50,
    manoeuvreOnGround,
    updateEnemyGroundAtack,
    createTargetedRocket
  )
}
