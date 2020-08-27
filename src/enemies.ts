import * as PIXI from "pixi.js";
import { enemyPath } from "./constants/waypoints";
import { drawEnemy } from "./draw";
import { checkIfCanShoot } from "./defenders";
import { incrementBalance } from "./balance";

interface EnemyType {
  [key: number]: {
    life: number;
    type: number;
    score: number;
  };
}

let enemies: Enemy[] = [];
const enemySpeed = 5;
const enemyTypes: EnemyType = {
  1: {
    type: 1,
    life: 5,
    score: 25,
  },
  2: {
    type: 2,
    life: 7,
    score: 30,
  },
};

export const addEnemy = (enemy: Enemy) => {
  enemies.push(enemy);
};

export const getEnemies = () => enemies;

export const createEnemy = (resources: PIXI.IResourceDictionary): Enemy => {
  const enemyType: number = Math.floor(Math.random() * 2) + 1;
  const { type, life, score } = enemyTypes[enemyType];
  return {
    life,
    x: 40,
    y: 0,
    movingAxis: "y",
    waypointIndex: 1,
    sprite: drawEnemy(resources, type),
    score,
  };
};

const moveLeft = (enemy: Enemy) => (enemy.sprite.x -= enemySpeed);
const moveRight = (enemy: Enemy) => (enemy.sprite.x += enemySpeed);
const moveUp = (enemy: Enemy) => (enemy.sprite.y -= enemySpeed);
const moveDown = (enemy: Enemy) => (enemy.sprite.y += enemySpeed);

const moveVertically = (enemy: Enemy, index: number) => {
  if (enemy.sprite.y > enemyPath[enemy.waypointIndex + 1][1]) {
    moveUp(enemy);
  } else {
    moveDown(enemy);
  }
};

const moveHorizontally = (enemy: Enemy, index: number) => {
  if (enemy.sprite.x > enemyPath[enemy.waypointIndex + index][0]) {
    moveLeft(enemy);
  } else {
    moveRight(enemy);
  }
};

const move = (enemy: Enemy) => {
  const waypoint = enemyPath[enemy.waypointIndex];
  const currentAxis = enemy.movingAxis;
  const wpIndex = currentAxis === "x" ? 0 : 1;
  if (enemy.sprite[currentAxis] === waypoint[wpIndex]) {
    enemy.waypointIndex += 1;
    enemy.movingAxis = currentAxis === "x" ? "y" : "x";
    console.log(enemy.sprite.x);
    currentAxis === "x" ? moveVertically(enemy, 1) : moveHorizontally(enemy, 1);
  } else {
    currentAxis === "x" ? moveHorizontally(enemy, 0) : moveVertically(enemy, 1);
  }
};

const enemyDead = (enemy: Enemy) => {
  const alive = enemy.life > 0;
  enemy.sprite.visible = alive;
  !alive && incrementBalance(enemy.score);
  return alive;
};

export const updateEnemies = () => {
  enemies = enemies
    .map((enemy) => {
      move(enemy);
      return checkIfCanShoot(enemy);
    })
    .filter(enemyDead);
};
