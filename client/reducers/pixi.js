const defaultState = {
  screen: {
    width: 0,
    height: 0
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "SETSCREENSIZE":
      return { ...state, screen: { ...state.screen, ...action.payload } };
    default:
      return state;
  }
};
