import {
  playerWidth,
  playerHeight,
  playerSpeed,
  enemyHeight,
  enemyWidth,
  missileHeight,
  missileWidth
} from "../constants";
import { gameover } from "./game";
import _ from "lodash";

const isPlayerInBounds = (x, y, screen) => {
  const maxX = x + playerWidth / 2;
  const maxY = y + playerHeight / 2;
  const minX = x - playerWidth / 2;
  const minY = y - playerHeight / 2;

  return minX > 0 && minY > 0 && maxX < screen.width && maxY < screen.height;
};

export const setPosition = (x, y) => {
  return (dispatch, getState) => {
    const action = { type: "SETPOSITION", payload: { x, y } };
    const {
      pixi: { screen }
    } = getState();

    if (isPlayerInBounds(x, y, screen)) {
      dispatch(action);
    }
  };
};

export const movePlayer = () => (dispatch, getState) => {
  const speed = playerSpeed;

  const {
    player: { position, directions }
  } = getState();
  const { x, y } = position;

  let newX = x;
  let newY = y;

  if (directions.up) {
    newY = newY - speed;
  }
  if (directions.down) {
    newY = newY + speed;
  }
  if (directions.left) {
    newX = newX - speed;
  }
  if (directions.right) {
    newX = newX + speed;
  }

  dispatch(setPosition(newX, newY));
};

export const updateMissiles = () => ({
  type: "UPDATEMISSILES"
});

export const removeOffscreenMissiles = () => (dispatch, getState) => {
  const {
    pixi: { screen },
    player: { missiles }
  } = getState();

  _.each(missiles, missile => {
    if (missile.x > screen.width + missileWidth / 2) {
      dispatch({ type: "REMOVEMISSILE", payload: missile });
    }
  });
};

const checkEnemyCollision = (player, enemy) => {
  const scale = 0.80
  const playerMinX = player.x - (playerWidth / 2) * scale;
  const playerMinY = player.y - (playerHeight /2) * 0.1;
  const playerMaxX = player.x + (playerWidth / 2) * scale;
  const playerMaxY = player.y + (playerHeight / 2) * scale;
  const enemyMinX = enemy.x - (enemyWidth / 2) * scale;
  const enemyMinY = enemy.y - (enemyHeight / 2) * 0.1;
  const enemyMaxX = enemy.x + (enemyWidth / 2) * scale;
  const enemyMaxY = enemy.y + (enemyHeight / 2) * scale;

  return (
    playerMinX < enemyMaxX &&
    playerMaxX > enemyMinX &&
    playerMinY < enemyMaxY &&
    playerMaxY > enemyMinY
  );
};

const checkMissileCollision = (player, missile) => {
  const missileMinX = missile.x - missileWidth / 2;
  const missileMinY = missile.y - missileHeight / 2;
  const missileMaxX = missile.x + missileWidth / 2;
  const missileMaxY = missile.y + missileHeight / 2;
  const playerMinX = player.x - playerWidth / 2;
  const playerMinY = player.y;
  const playerMaxX = player.x + playerWidth / 2;
  const playerMaxY = player.y + playerHeight / 2;

  return (
    missileMinX < playerMaxX &&
    missileMaxX > playerMinX &&
    missileMinY < playerMaxY &&
    missileMaxY > playerMinY
  );
};

export const checkPlayerAlive = () => (dispatch, getState) => {
  const { player, enemies, enemyMissiles } = getState();

  for (let i = 0; i < enemies.length; i++) {
    if (checkEnemyCollision(player.position, enemies[i])) {
      dispatch(gameover());
      return;
    }
  }

  for (let i = 0; i < enemyMissiles.length; i++) {
    if (checkMissileCollision(player.position, enemyMissiles[i])) {
      dispatch(gameover());
      return;
    }
  }
};
