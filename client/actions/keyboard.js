import _ from "lodash";

export const fireMissle = _.throttle(dispatch => {
  dispatch({
    type: "FIREMISSILE"
  });
}, 500);

export const keydown = key => ({
  type: "KEYDOWN",
  payload: { key }
});

export const keyup = key => dispatch => {
  if (key === " ") {
    return fireMissle(dispatch);
  }

  dispatch({
    type: "KEYUP",
    payload: { key }
  });
};
