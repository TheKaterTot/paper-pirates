import {
  playerWidth,
  playerHeight,
  playerSpeed,
  missileWidth
} from "../constants";

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

export const movePlayer = () => (dispatch, getState) => {
  const speed = playerSpeed;

  const {
    player: { position, directions }
  } = getState();
  const { x, y } = position;

  let newX = x;
  let newY = y;

  if (directions.up) {
    newY = newY - speed;
  }
  if (directions.down) {
    newY = newY + speed;
  }
  if (directions.left) {
    newX = newX - speed;
  }
  if (directions.right) {
    newX = newX + speed;
  }

  dispatch(setPosition(newX, newY));
};

export const updateMissiles = () => ({
  type: "UPDATEMISSILES"
});

export const removeOffscreenMissiles = () => (dispatch, getState) => {
  const {
    pixi: { screen },
    player: { missiles }
  } = getState();

  _.each(missiles, missile => {
    if (missile.x > screen.width + missileWidth / 2) {
      dispatch({ type: "REMOVEMISSILE", payload: missile });
    }
  });
};
