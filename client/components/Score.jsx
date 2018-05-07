import _ from "lodash";
import * as React from "react";
import { Component } from "react";
import * as PIXI from "pixi.js";
import WithPixi from "../decorators/WithPixi";

class Score extends Component {
  constructor(props) {
    super(props);
    this.text = new PIXI.Text(`Score: ${this.props.score}`, {
      fill: 0xffffff,
      stroke: 0x000000
    });
    this.text.x = 25;
    this.text.y = 25;
  }

  componentDidUpdate() {
    this.text.text = `Score: ${this.props.score}`;
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

export default WithPixi(Score);
