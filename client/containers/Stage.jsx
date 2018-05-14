import * as React from "react";
import * as PIXI from "pixi.js";
import { Component } from "react";
import PixiContext from "../contexts/pixi";

class Stage extends Component {
  constructor(props) {
    super(props);
    const { backgroundColor } = this.props;
    this.application = new PIXI.Application(
      this.props.width,
      this.props.height,
      {
        antialias: true,
        backgroundColor
      }
    );
    this.onRef = this.onRef.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {width, height, backgroundColor} = this.props;

    this.application.renderer.view.style.width = `${width}px`;
    this.application.renderer.view.style.height = `${height}px`;
    this.application.renderer.resize(width, height);
    this.application.renderer.backgroundColor = backgroundColor;
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
