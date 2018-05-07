const defaultState = {
  state: "title"
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "GAMESTART":
      return { ...state, state: "playing" };
    case "GAMEOVER":
      return { ...state, state: "gameover" };
    default:
      return state;
  }
};
