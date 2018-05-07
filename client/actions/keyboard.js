import { playerWidth, playerHeight } from "../constants";

export const keydown = key => ({
  type: "KEYDOWN",
  payload: { key }
});

export const keyup = key => ({
  type: "KEYUP",
  payload: { key }
});

const isPlayerInBounds = (x, y, screen) => {
  const maxX = x + playerWidth / 2;
  const maxY = y + playerHeight / 2;
  const minX = x - playerWidth / 2;
  const minY = y - playerHeight / 2;

  return minX > 0 && minY > 0 && maxX < screen.width && maxY < screen.height;
};

export const setPosition = (x, y) => {
  return (dispatch, getState) => {
    const action = { type: "SETPOSITION", payload: { x, y } };
    const {
      pixi: { screen }
    } = getState();

    if (isPlayerInBounds(x, y, screen)) {
      dispatch(action);
    }
  };
};
