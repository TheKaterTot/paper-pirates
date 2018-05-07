import _ from "lodash";
import * as React from "react";
import { Component } from "react";
import * as PIXI from "pixi.js";
import WithPixi from "../decorators/WithPixi";

class Text extends Component {
  constructor(props) {
    super(props);
    this.text = new PIXI.Text(this.props.text, this.props.style || {});
    this.text.anchor.set(0.5);
    this.text.x = this.props.x;
    this.text.y = this.props.y;
  }

  componentDidUpdate() {
    const { style, x, y, text } = this.props;

    this.text.style = style || {};
    this.text.x = x;
    this.text.y = y;
    this.text.text = text;
  }

  componentDidMount() {
    const { parent } = this.props;
    parent.addChild(this.text);
  }

  componentWillUnmount() {
    const { parent } = this.props;
    parent.removeChild(this.text);
  }

  render() {
    return _.get(this.props, "children", null);
  }
}

export default WithPixi(Text);
