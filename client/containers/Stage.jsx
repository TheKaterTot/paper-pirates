import * as React from "react";
import * as PIXI from "pixi.js";
import { Component } from "react";
import PixiContext from "../contexts/pixi";

class Stage extends Component {
  constructor(props) {
    super(props);
    const { backgroundColor } = this.props;
    this.application = new PIXI.Application(800, 600, {
      antialias: true,
      backgroundColor
    });
    this.onRef = this.onRef.bind(this);
  }

  render() {
    return (
      <PixiContext.Provider value={{ parent: this.application.stage }}>
        <div ref={this.onRef}>{this.props.children}</div>
      </PixiContext.Provider>
    );
  }

  onRef(ref) {
    ref.appendChild(this.application.view);
  }
}

export default Stage;
