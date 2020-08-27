import * as PIXI from "pixi.js";

import { drawTower, drawMap, drawGrid, drawEnemy } from "./draw";
import { addEnemy, updateEnemies, createEnemy } from "./enemies";

const Application = PIXI.Application;
const loader = PIXI.Loader.shared;
const resources = loader.resources;

const canvas = {
  height: 600,
  width: 800,
};

let balance = 300;

const towerPosition = { x: 40, y: 540 };

const app = new Application({
  width: canvas.width,
  height: canvas.height,
});

const gameLoop = () => {
  requestAnimationFrame(gameLoop);
  updateEnemies();
};

const setup = () => {
  app.stage.addChild(drawMap(canvas.width, canvas.height, resources));
  drawGrid(canvas.width, canvas.height, app);
  const enemy = createEnemy(resources);
  addEnemy(enemy);
  app.stage.addChild(enemy.sprite);
  app.stage.addChild(drawTower(towerPosition.x, towerPosition.y, resources));

  setInterval(() => {
    const enemy = createEnemy(resources);
    addEnemy(enemy);
    app.stage.addChild(enemy.sprite);
  }, 250);

  gameLoop();
};

const loadSprites = () => {
  loader
    .add({ name: "tower", url: "assets/cat.png" })
    .add({ name: "map", url: "assets/map.png" })
    .add({ name: "enemy-1", url: "assets/cat.png" })
    .add({ name: "enemy-2", url: "assets/enemy-2.png" })
    .load(setup);
};

loadSprites();
document.getElementById("canvas").appendChild(app.view);
