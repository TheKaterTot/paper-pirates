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
  }
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

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "KEYUP":
      return keyup(state, action.payload.key);
    case "KEYDOWN":
      return keydown(state, action.payload.key);
    case "SETPOSITION":
      const { x, y } = action.payload;
      const { position } = state;
      return { ...state, position: { ...position, x, y } };
    default:
      return state;
  }
};

export default reducer;
