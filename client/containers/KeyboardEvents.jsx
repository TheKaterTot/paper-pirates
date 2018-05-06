import * as React from "react";
import { Component } from "react";

class KeyboardEvents extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.props.onKeyDown);
    window.addEventListener("keyup", this.props.onKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.props.onKeyDown);
    window.removeEventListener("keyup", this.props.onKeyUp);
  }

  render() {
    return this.props.children;
  }
}

export default KeyboardEvents;
