import * as React from "react";
import { Component } from "react";

import Stage from "./Stage";
import Sprite from "../components/Sprite";

class App extends Component {
  render() {
    return (
      <Stage backgroundColor={0x6495ed}>
        <Sprite x={100} y={100} filename={"player.png"} scale={0.1} />
      </Stage>
    );
  }
}

export default App;
