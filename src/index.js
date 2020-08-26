const Application = PIXI.Application;
const Container = PIXI.Container;
const loader = PIXI.loader;
const resources = PIXI.loader.resources;
const TextureCache = PIXI.utils.TextureCache;
const Sprite = PIXI.Sprite;
const Rectangle = PIXI.Rectangle;
const Graphics = PIXI.Graphics;

const waypoints = [
  [60, 0],
  [60, 100],
  // [100, 100],
  [380, 100],
  [380, 60],
  [740, 60],
  [740, 380],
  [620, 400],
  [620, 180],
  [460, 180],
  [460, 220],
  [60, 220],
  [60, 300],
  [460, 300],
  [460, 460],
  [740, 460],
  [740, 580],
  [340, 580],
  [360, 420],
  [100, 420],
  [100, 540],
  [40, 540],
];

let enemies = [];
let defenders = [];

const canvas = {
  height: 600,
  width: 800,
  background: "transparent",
};

const towerPosition = { x: 40, y: 540 };

const app = new Application({
  width: canvas.width,
  height: canvas.height,
  backgroundColor: canvas.background,
});

const drawTower = () => {
  const { x, y } = towerPosition;
  const tower = new Sprite(resources["tower"].texture);
  tower.width = 20;
  tower.height = 20;
  tower.position.set(x, y);
  app.stage.addChild(tower);
};

const drawMap = () => {
  const map = new Sprite(resources["map"].texture);
  map.width = canvas.width;
  map.height = canvas.height;
  map.position.set(0, 0);
  app.stage.addChild(map);
};

const drawDefender = (mouseData) => {
  let circle = new Graphics();
  circle.lineStyle(1, 0xffffff, 1);
  circle.drawCircle(0, 0, 10, 10);
  circle.x = mouseData.target.x + 20;
  circle.y = mouseData.target.y + 20;
  app.stage.addChild(circle);
  defenders.push({
    x: mouseData.target.x + 20,
    y: mouseData.target.y + 20,
    shooting: false,
  });
};

const drawGrid = () => {
  for (let x = 0; x < canvas.width; x += 40) {
    for (let y = 0; y < canvas.width; y += 40) {
      let rectangle = new Graphics();
      rectangle.interactive = true;
      rectangle.hitArea = new PIXI.Rectangle(0, 0, 40, 40);
      rectangle.lineStyle(1, 0xffffff, 1);
      rectangle.drawRect(0, 0, 40, 40);
      rectangle.x = x;
      rectangle.y = y;

      rectangle.click = function (mouseData) {
        drawDefender(mouseData);
      };
      app.stage.addChild(rectangle);
    }
  }
};

const checkIfCanShoot = (enemy) => {
  const shoot = defenders.filter((defender) => {
    const { x, y } = defender;
    if (
      !defender.shooting &&
      (enemy.sprite.x === x + 40 || enemy.sprite.x === x - 40) &&
      (enemy.sprite.y === y + 40 || enemy.sprite.y === y - 40)
    ) {
      defender.shooting = true;
      setTimeout(() => {
        defender.shooting = false;
      }, 500);
      return true;
    }
    return false;
  });
  if (!!shoot.length) {
    enemy.life -= 1;
    return enemy;
  }
  return enemy;
};

const drawEnemy = () => {
  enemies = enemies
    .map((enemy) => {
      const waypoint = waypoints[enemy.waypointIndex];
      if (enemy.movingAxis === "x") {
        if (enemy.sprite.x === waypoint[0]) {
          enemy.waypointIndex += 1;
          enemy.movingAxis = "y";

          if (enemy.sprite.y > waypoints[enemy.waypointIndex + 1][0]) {
            enemy.sprite.position.set(enemy.sprite.x, enemy.sprite.y - 5);
          } else {
            enemy.sprite.position.set(enemy.sprite.x, enemy.sprite.y + 5);
          }
        } else {
          if (enemy.sprite.x > waypoints[enemy.waypointIndex][0]) {
            enemy.sprite.position.set(enemy.sprite.x - 5, enemy.sprite.y);
          } else {
            enemy.sprite.position.set(enemy.sprite.x + 5, enemy.sprite.y);
          }
        }
      } else {
        if (enemy.sprite.y === waypoint[1]) {
          enemy.waypointIndex += 1;
          enemy.movingAxis = "x";
          if (enemy.sprite.y > waypoints[enemy.waypointIndex + 1][1]) {
            enemy.sprite.position.set(enemy.sprite.x - 5, enemy.sprite.y);
          } else {
            enemy.sprite.position.set(enemy.sprite.x + 5, enemy.sprite.y);
          }
        } else {
          if (enemy.sprite.y > waypoints[enemy.waypointIndex + 1][1]) {
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

const createEnemy = () => {
  const tower = new Sprite(resources["tower"].texture);
  tower.width = 20;
  tower.height = 20;
  tower.position.set(60, 0);
  tower.anchor.set(0.5);
  app.stage.addChild(tower);

  return tower;
};

const gameLoop = () => {
  requestAnimationFrame(gameLoop);
  drawEnemy();
};

const setup = () => {
  drawMap();
  drawGrid();

  enemies.push({
    life: 5,
    x: 40,
    y: 0,
    movingAxis: "y",
    waypointIndex: 1,
    sprite: createEnemy(),
  });

  setInterval(() => {
    enemies.push({
      life: 5,
      x: 40,
      y: 0,
      movingAxis: "y",
      waypointIndex: 1,
      sprite: createEnemy(),
    });
  }, 500);

  // createEnemy();

  drawTower();
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
