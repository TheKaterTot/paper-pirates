import _ from "lodash";
import { enemySpeed } from "../constants";

const defaultState = [];

const updateEnemies = enemies => {
  return _.map(enemies, enemy => {
    return { ...enemy, x: enemy.x - enemySpeed };
  });
};

const removeEnemy = (enemies, enemy) => {
  return _.filter(enemies, e => {
    return e.id !== enemy.id;
  });
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "CREATEENEMY":
      return [...state, action.payload];
    case "REMOVEENEMY":
      return removeEnemy(state, action.payload);
    case "UPDATEENEMIES":
      return updateEnemies(state);
    case "GAMESTART":
      return defaultState;
    default:
      return state;
  }
};
