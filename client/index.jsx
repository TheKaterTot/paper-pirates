import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./containers/App";
import PlayerReducer from "./reducers/player";
import PixiReducer from "./reducers/pixi";

import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import Thunk from "redux-thunk";

const store = createStore(
  combineReducers({
    player: PlayerReducer,
    pixi: PixiReducer
  }),
  applyMiddleware(Thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#app")
);
