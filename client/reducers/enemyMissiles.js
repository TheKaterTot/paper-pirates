import { enemyWidth, missileSpeed } from "../constants";
import uuid from "uuid";
import _ from "lodash";

const defaultState = [];

const createMissile = ({ x, y }) => {
  const id = uuid.v4();

  return {
    y,
    x: x - enemyWidth / 2,
    id
  };
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "ENEMYFIRE":
      return [...state, createMissile(action.payload)];
    case "ENEMYMISSILEMOVE":
      return _.map(state, missile => {
        if (missile.id === action.payload.id) {
          return { ...missile, x: missile.x - missileSpeed };
        }

        return missile;
      });
    case "REMOVEENEMYMISSILE":
      return _.filter(state, m => m.id !== action.payload.id);
    case "GAMESTART":
      return defaultState;
    default:
      return state;
  }
};
