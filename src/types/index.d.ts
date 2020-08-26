interface Defender {
  x: number;
  y: number;
  shooting: boolean;
}

interface Enemy {
  life: number;
  x: number;
  y: number;
  movingAxis: "x" | "y";
  waypointIndex: number;
  sprite: PIXI.Sprite;
}
