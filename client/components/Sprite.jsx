import _ from "lodash";
import * as React from "react";
import { Component } from "react";
import * as PIXI from "pixi.js";
import WithPixi from "../decorators/WithPixi";

class Sprite extends Component {
  constructor(props) {
    super(props);
    const { filename, x, y, height, width } = this.props;

    this.pixiSprite = PIXI.Sprite.fromImage(`/public/images/${filename}`);
    this.pixiSprite.anchor.set(0.5);
    this.pixiSprite.x = x;
    this.pixiSprite.y = y;
    this.pixiSprite.height = height;
    this.pixiSprite.width = width;
  }

  componentDidUpdate() {
    const { x, y, height, width } = this.props;

    this.pixiSprite.x = x;
    this.pixiSprite.y = y;
    this.pixiSprite.height = height;
    this.pixiSprite.width = width;
  }

  componentDidMount() {
    const { parent } = this.props;

    parent.addChild(this.pixiSprite);
    this.pixiSprite.parentLayer = parent
  }

  componentWillUnmount() {
    const { parent } = this.props;

    parent.removeChild(this.pixiSprite);
  }

  render() {
    return _.get(this.props, "children", null);
  }
}

export default WithPixi(Sprite);
