import * as React from "react";
import { Component } from "react";

class Loop extends Component {
  constructor(props) {
    super(props);
    this.isRunning = false;
    this.running = this.running.bind(this);
  }

  componentDidMount() {
    this.isRunning = true;
    this.running();
  }

  componentWillUnmount() {
    this.isRunning = false;
  }

  render() {
    return this.props.children;
  }

  running() {
    if (!this.isRunning) {
      return;
    }

    window.requestAnimationFrame(this.running);
    this.props.onTick();
  }
}

export default Loop;
