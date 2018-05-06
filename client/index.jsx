import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./containers/App";
import PlayerReducer from "./reducers/player";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

const store = createStore(
  combineReducers({
    player: PlayerReducer
  })
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#app")
);
