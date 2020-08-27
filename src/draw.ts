import * as PIXI from "pixi.js";
import { addDefender } from "./defenders";

const Sprite = PIXI.Sprite;
const Graphics = PIXI.Graphics;
const Rectangle = PIXI.Rectangle;

export const drawTower = (
  x: number,
  y: number,
  resources: PIXI.IResourceDictionary
) => {
  const tower = new Sprite(resources["tower"].texture);
  tower.width = 20;
  tower.height = 20;
  tower.position.set(x, y);
  return tower;
};

export const drawMap = (
  width: number,
  height: number,
  resources: PIXI.IResourceDictionary
) => {
  const map = new Sprite(resources["map"].texture);
  map.width = width;
  map.height = height;
  map.position.set(0, 0);
  return map;
};

export const drawDefender = (
  mouseData: PIXI.InteractionEvent,
  app: PIXI.Application
) => {
  let circle = new Graphics();
  circle.lineStyle(1, 0xffffff, 1);
  circle.drawCircle(0, 0, 10);
  circle.x = mouseData.target.x + 20;
  circle.y = mouseData.target.y + 20;
  app.stage.addChild(circle);
  addDefender({
    x: mouseData.target.x + 20,
    y: mouseData.target.y + 20,
    shooting: false,
  });
};

export const drawGrid = (
  width: number,
  height: number,
  app: PIXI.Application
) => {
  for (let x = 0; x < width; x += 40) {
    for (let y = 0; y < height; y += 40) {
      let rectangle = new Graphics();
      rectangle.interactive = true;
      rectangle.hitArea = new Rectangle(0, 0, 40, 40);
      rectangle.lineStyle(1, 0xffffff, 1);
      rectangle.drawRect(0, 0, 40, 40);
      rectangle.x = x;
      rectangle.y = y;
      rectangle.addListener("click", (mouseData: PIXI.InteractionEvent) =>
        drawDefender(mouseData, app)
      );
      app.stage.addChild(rectangle);
    }
  }
};

export const drawEnemy = (
  resources: PIXI.IResourceDictionary,
  type: number
) => {
  const enemy = new Sprite(resources[`enemy-${type}`].texture);
  enemy.width = 20;
  enemy.height = 20;
  enemy.position.set(60, 0);
  enemy.anchor.set(0.5);
  return enemy;
};
