import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { keydown, keyup, setPosition } from "../actions/keyboard";
import { setScreenSize } from "../actions/pixi";

import Loop from "./Loop";
import Stage from "./Stage";
import Sprite from "../components/Sprite";
import KeyboardEvents from "./KeyboardEvents";

import {
  gameBackgroundColor,
  playerHeight,
  playerWidth,
  playerSpeed,
  screenHeight,
  screenWidth
} from "../constants";

class App extends Component {
  constructor(props) {
    super(props);
    this.props.setScreenSize(screenWidth, screenHeight);
  }

  render() {
    const {
      player: { position },
      screen
    } = this.props;

    return (
      <Loop onTick={this.onTick}>
        <KeyboardEvents onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp}>
          <Stage
            backgroundColor={gameBackgroundColor}
            width={screen.width}
            height={screen.height}
          >
            <Sprite
              width={playerWidth}
              height={playerHeight}
              x={position.x}
              y={position.y}
              filename={"player.png"}
            />
          </Stage>
        </KeyboardEvents>
      </Loop>
    );
  }

  onKeyUp = e => {
    this.props.keyup(e.key);
  };

  onKeyDown = e => {
    this.props.keydown(e.key);
  };

  onTick = () => {
    this.movePlayer();
  };

  movePlayer() {
    const speed = playerSpeed;
    const {
      player: { position, directions }
    } = this.props;
    const { x, y } = position;

    let newX = x;
    let newY = y;

    if (directions.up) {
      newY = newY - speed;
    }
    if (directions.down) {
      newY = newY + speed;
    }
    if (directions.left) {
      newX = newX - speed;
    }
    if (directions.right) {
      newX = newX + speed;
    }

    this.props.setPosition(newX, newY);
  }
}

const mapDispatchToProps = dispatch => ({
  keydown: key => {
    dispatch(keydown(key));
  },
  keyup: key => {
    dispatch(keyup(key));
  },
  setPosition: (x, y) => {
    dispatch(setPosition(x, y));
  },
  setScreenSize: (width, height) => {
    dispatch(setScreenSize(width, height));
  }
});

const mapStateToProps = ({ player, pixi: { screen } }) => ({
  player,
  screen
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
