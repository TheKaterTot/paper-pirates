import _ from "lodash";
import uuid from "uuid";
import { enemyWidth, enemyHeight } from "../constants";
const createEnemies = number => {};

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
