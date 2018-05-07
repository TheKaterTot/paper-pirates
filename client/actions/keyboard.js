import _ from "lodash";
import { placeInitialEnemies } from "./enemy";
import { gamestart } from "./game";
import { playerfire } from "./game";

export const fireMissle = _.throttle(dispatch => {
  dispatch(playerfire());
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
      dispatch(gamestart());
      dispatch(placeInitialEnemies());
      return;
    }
  }

  if (state === "title") {
    if (key === "Enter") {
      dispatch(gamestart());
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
