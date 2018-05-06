import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { keydown, keyup, setPosition } from "../actions/keyboard";

import Loop from "./Loop";
import Stage from "./Stage";
import Sprite from "../components/Sprite";
import KeyboardEvents from "./KeyboardEvents";

class App extends Component {
  render() {
    const {
      player: { position }
    } = this.props;

    return (
      <Loop onTick={this.onTick}>
        <KeyboardEvents onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp}>
          <Stage backgroundColor={0x6495ed}>
            <Sprite
              x={position.x}
              y={position.y}
              filename={"player.png"}
              scale={0.15}
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
    const speed = 0.9;
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
  }
});

const mapStateToProps = ({ player }) => ({
  player
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
