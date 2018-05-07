export const keydown = key => ({
  type: "KEYDOWN",
  payload: { key }
});

export const keyup = key => ({
  type: "KEYUP",
  payload: { key }
});
