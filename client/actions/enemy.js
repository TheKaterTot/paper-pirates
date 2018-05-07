import _ from "lodash";
import uuid from "uuid";
import {
  enemyWidth,
  enemyHeight,
  missileWidth,
  missileHeight
} from "../constants";

const numberOfEnemies = 4;

const createEnemy = screen => {
  const x = _.random(
    screen.width + enemyWidth / 2,
    screen.width + enemyWidth * 4
  );
  const y = _.random(enemyHeight / 2, screen.height - enemyHeight / 2);
  const id = uuid.v4();

  return { x, y, id };
};

export const updateEnemies = () => ({
  type: "UPDATEENEMIES"
});

export const placeInitialEnemies = () => (dispatch, getState) => {
  const {
    pixi: { screen }
  } = getState();

  _.times(numberOfEnemies, () => {
    dispatch({
      type: "CREATEENEMY",
      payload: createEnemy(screen)
    });
  });
};

export const removeOffScreenEnemies = () => (dispatch, getState) => {
  const {
    enemies,
    pixi: { screen }
  } = getState();

  _.each(enemies, enemy => {
    if (enemy.x < -enemyWidth / 2) {
      dispatch({ type: "REMOVEENEMY", payload: enemy });
      dispatch({ type: "CREATEENEMY", payload: createEnemy(screen) });
    }
  });
};

const isColliding = (enemy, missile) => {
  const missileMinX = missile.x - missileWidth / 2;
  const missileMinY = missile.y - missileHeight / 2;
  const missileMaxX = missile.x + missileWidth / 2;
  const missileMaxY = missile.y + missileHeight / 2;
  const enemyMinX = enemy.x - enemyWidth / 2;
  const enemyMinY = enemy.y - enemyHeight / 2;
  const enemyMaxX = enemy.x + enemyWidth / 2;
  const enemyMaxY = enemy.y + enemyHeight / 2;

  return (
    missileMinX < enemyMaxX &&
    missileMaxX > enemyMinX &&
    missileMinY < enemyMaxY &&
    missileMaxY > enemyMinY
  );
};

export const checkEnemyMissileColisions = () => (dispatch, getState) => {
  const {
    enemies,
    pixi: { screen },
    player: { missiles }
  } = getState();

  _.each(enemies, enemy => {
    _.each(missiles, missile => {
      if (isColliding(enemy, missile)) {
        dispatch({ type: "REMOVEENEMY", payload: enemy });
        dispatch({ type: "CREATEENEMY", payload: createEnemy(screen) });
        dispatch({ type: "REMOVEMISSILE", payload: missile });
        dispatch({ type: "INCREMENTSCORE", payload: { count: 1 } });
      }
    });
  });
};
