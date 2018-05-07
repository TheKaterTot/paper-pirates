import uuid from "uuid";
import { playerWidth, missileSpeed } from "../constants";

const defaultState = {
  position: {
    x: 100,
    y: 100
  },
  directions: {
    up: false,
    down: false,
    right: false,
    left: false
  },
  missiles: [],
  score: 0
};

const keyup = (state, key) => {
  switch (key) {
    case "ArrowDown":
      return {
        ...state,
        directions: { ...state.directions, down: false }
      };
    case "ArrowUp":
      return {
        ...state,
        directions: { ...state.directions, up: false }
      };
    case "ArrowLeft":
      return {
        ...state,
        directions: { ...state.directions, left: false }
      };
    case "ArrowRight":
      return {
        ...state,
        directions: { ...state.directions, right: false }
      };
    default:
      return state;
  }
};

const keydown = (state, key) => {
  switch (key) {
    case "ArrowDown":
      return {
        ...state,
        directions: { ...state.directions, down: true }
      };
    case "ArrowUp":
      return {
        ...state,
        directions: { ...state.directions, up: true }
      };
    case "ArrowLeft":
      return {
        ...state,
        directions: { ...state.directions, left: true }
      };
    case "ArrowRight":
      return {
        ...state,
        directions: { ...state.directions, right: true }
      };
    default:
      return state;
  }
};

const keypress = (state, key) => {
  if (key === " ") {
    console.log("YO!");
  } else {
    return state;
  }
};

const createMissile = state => {
  const { x, y } = state.position;

  return {
    y,
    x: x + playerWidth / 2,
    id: uuid.v4()
  };
};

const updateMissiles = state => {
  const missiles = _.map(state.missiles, missile => {
    return { ...missile, x: missile.x + missileSpeed };
  });

  return { ...state, missiles };
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "KEYUP":
      return keyup(state, action.payload.key);
    case "KEYDOWN":
      return keydown(state, action.payload.key);
    case "FIREMISSILE":
      return { ...state, missiles: [...state.missiles, createMissile(state)] };
    case "REMOVEMISSILE":
      return {
        ...state,
        missiles: _.filter(state.missiles, m => m.id !== action.payload.id)
      };
    case "SETPOSITION":
      const { x, y } = action.payload;
      const { position } = state;
      return { ...state, position: { ...position, x, y } };
    case "UPDATEMISSILES":
      return updateMissiles(state);
    case "KEYPRESS":
      return keypress(state, action.payload.key);
    case "INCREMENTSCORE":
      return { ...state, score: state.score + action.payload.count };
    default:
      return state;
  }
};

export default reducer;
