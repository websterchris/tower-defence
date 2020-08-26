import * as PIXI from "pixi.js";
import { enemyPath } from "./constants/waypoints";
import { checkIfCanShoot } from "./defenders";

let enemies: Enemy[] = [];

export const addEnemy = (enemy: Enemy) => {
  enemies.push(enemy);
};

export const getEnemies = () => enemies;

export const createEnemy = (sprite: PIXI.Sprite): Enemy => ({
  life: 5,
  x: 40,
  y: 0,
  movingAxis: "y",
  waypointIndex: 1,
  sprite,
});

export const updateEnemies = () => {
  enemies = enemies
    .map((enemy) => {
      const waypoint = enemyPath[enemy.waypointIndex];
      if (enemy.movingAxis === "x") {
        if (enemy.sprite.x === waypoint[0]) {
          enemy.waypointIndex += 1;
          enemy.movingAxis = "y";
          if (enemy.sprite.y > enemyPath[enemy.waypointIndex + 1][0]) {
            enemy.sprite.position.set(enemy.sprite.x, enemy.sprite.y - 5);
          } else {
            enemy.sprite.position.set(enemy.sprite.x, enemy.sprite.y + 5);
          }
        } else {
          if (enemy.sprite.x > enemyPath[enemy.waypointIndex][0]) {
            enemy.sprite.position.set(enemy.sprite.x - 5, enemy.sprite.y);
          } else {
            enemy.sprite.position.set(enemy.sprite.x + 5, enemy.sprite.y);
          }
        }
      } else {
        if (enemy.sprite.y === waypoint[1]) {
          enemy.waypointIndex += 1;
          enemy.movingAxis = "x";
          if (enemy.sprite.y > enemyPath[enemy.waypointIndex + 1][1]) {
            enemy.sprite.position.set(enemy.sprite.x - 5, enemy.sprite.y);
          } else {
            enemy.sprite.position.set(enemy.sprite.x + 5, enemy.sprite.y);
          }
        } else {
          if (enemy.sprite.y > enemyPath[enemy.waypointIndex + 1][1]) {
            enemy.sprite.position.set(enemy.sprite.x, enemy.sprite.y - 5);
          } else {
            enemy.sprite.position.set(enemy.sprite.x, enemy.sprite.y + 5);
          }
        }
      }
      return checkIfCanShoot(enemy);
    })
    .filter((enemy) => {
      if (enemy.life === 0) {
        enemy.sprite.visible = false;
        return false;
      }
      return true;
    });
};
