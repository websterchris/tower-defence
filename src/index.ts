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
  const enemy = drawEnemy(resources);
  addEnemy(createEnemy(enemy));
  app.stage.addChild(enemy);
  app.stage.addChild(drawTower(towerPosition.x, towerPosition.y, resources));

  // setInterval(() => {
  //   const enemy = drawEnemy(resources);
  //   addEnemy(createEnemy(enemy));
  //   app.stage.addChild(enemy);
  // }, 500);

  gameLoop();
};

const loadSprites = () => {
  loader
    .add({ name: "tower", url: "assets/cat.png" })
    .add({ name: "map", url: "assets/map.png" })
    .load(setup);
};

loadSprites();
document.body.appendChild(app.view);
