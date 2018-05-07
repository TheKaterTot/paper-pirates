import Client from "../client";

export const gameover = () => (dispatch, getState) => {
  const {
    player: { score }
  } = getState();

  Client.emit("gameover", { score });
  dispatch({ type: "GAMEOVER" });
};
