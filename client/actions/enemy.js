import _ from "lodash";
import { enemyWidth, enemyHeight } from "../constants";
const createEnemies = number => {};

const numberOfEnemies = 4;

export const updateEnemies = () => ({
  type: "UPDATEENEMIES"
});

export const placeInitialEnemies = () => {
  return (dispatch, getState) => {
    const {
      pixi: { screen }
    } = getState();

    _.times(numberOfEnemies, () => {
      const x = _.random(
        screen.width + enemyWidth / 2,
        screen.width + enemyWidth * 4
      );
      const y = _.random(enemyHeight / 2, screen.height - enemyHeight / 2);

      dispatch({
        type: "CREATEENEMY",
        payload: { x: x - 600, y }
      });
    });
  };
};
