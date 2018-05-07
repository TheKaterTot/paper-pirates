const defaultState = {
  state: "gameover"
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "GAMESTART":
      return { ...state, state: "playing" };
    default:
      return state;
  }
};
