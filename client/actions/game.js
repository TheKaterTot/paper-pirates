import Client from "../client";

export const gameover = () => (dispatch, getState) => {
  const {
    player: { score }
  } = getState();

  Client.emit("gameover", { score });
  dispatch({ type: "GAMEOVER" });
};

export const gamestart = () => (dispatch, getState) => {
  const {
    game: {}
  } = getState();

  Client.emit("gamestart");
  dispatch({ type: "GAMESTART"});
};

export const playerfire = () => (dispatch, getState) => {
  const {
    player: { missiles }
  } = getState();

  Client.emit("playerfire", { missiles });
  dispatch({type: "FIREMISSILE"});
};
