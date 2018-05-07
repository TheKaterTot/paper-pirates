import _ from "lodash";
import { enemySpeed } from "../constants";

const defaultState = [];

const updateEnemies = enemies => {
  return _.map(enemies, enemy => {
    return { ...enemy, x: enemy.x - enemySpeed };
  });
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "CREATEENEMY":
      return [...state, action.payload];
    case "UPDATEENEMIES":
      return updateEnemies(state);
    default:
      return state;
  }
};
