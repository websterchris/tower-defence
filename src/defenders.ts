let defenders: Defender[] = [];

export const addDefender = (defender: Defender) => {
  defenders.push(defender);
};

export const getDefenders = () => defenders;

export const checkIfCanShoot = (enemy: Enemy) => {
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
