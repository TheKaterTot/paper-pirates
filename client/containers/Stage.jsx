import * as React from "react";
import * as PIXI from "pixi.js";
import { Component } from "react";
import PixiContext from "../contexts/pixi";

class Stage extends Component {
  constructor(props) {
    super(props);
    this.application = new PIXI.Application(800, 600, { antialias: true });
    this.onRef = this.onRef.bind(this);
  }

  render() {
    return (
      <PixiContext.Provider value={{ parent: this.application.stage }}>
        <div ref={this.onRef} />;
      </PixiContext.Provider>
    );
  }

  onRef(ref) {
    ref.appendChild(this.application.view);
  }
}

export default Stage;
