import _ from "lodash";
import { placeInitialEnemies } from "./enemy";

export const fireMissle = _.throttle(dispatch => {
  dispatch({
    type: "FIREMISSILE"
  });
}, 500);

export const keydown = key => ({
  type: "KEYDOWN",
  payload: { key }
});

export const keyup = key => (dispatch, getState) => {
  const {
    game: { state }
  } = getState();

  if (state === "gameover") {
    if (key === "Enter") {
      dispatch({ type: "GAMESTART" });
      dispatch(placeInitialEnemies());
      return;
    }
  }

  if (state === "playing") {
    if (key === " ") {
      return fireMissle(dispatch);
    }

    dispatch({
      type: "KEYUP",
      payload: { key }
    });
  }
};
