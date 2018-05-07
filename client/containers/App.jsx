import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { keydown, keyup } from "../actions/keyboard";
import { movePlayer, setPosition } from "../actions/player";
import { setScreenSize } from "../actions/pixi";
import {
  placeInitialEnemies,
  updateEnemies,
  removeOffScreenEnemies
} from "../actions/enemy";

import Loop from "./Loop";
import Stage from "./Stage";
import Sprite from "../components/Sprite";
import KeyboardEvents from "./KeyboardEvents";

import {
  gameBackgroundColor,
  playerHeight,
  playerWidth,
  playerSpeed,
  enemyHeight,
  enemyWidth,
  screenHeight,
  screenWidth
} from "../constants";

class App extends Component {
  constructor(props) {
    super(props);
    this.props.setScreenSize(screenWidth, screenHeight);
    this.props.placeInitialEnemies();
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

            {this.enemies}
          </Stage>
        </KeyboardEvents>
      </Loop>
    );
  }

  get enemies() {
    return _.map(this.props.enemies, (enemy, i) => {
      return (
        <Sprite
          key={i}
          width={enemyWidth}
          height={enemyHeight}
          x={enemy.x}
          y={enemy.y}
          filename={"enemy.png"}
        />
      );
    });
  }

  onKeyUp = e => {
    this.props.keyup(e.key);
  };

  onKeyDown = e => {
    this.props.keydown(e.key);
  };

  onTick = () => {
    this.props.movePlayer();
    this.props.updateEnemies();
    this.props.removeOffScreenEnemies();
  };
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
  },
  placeInitialEnemies: () => {
    dispatch(placeInitialEnemies());
  },
  updateEnemies: () => {
    dispatch(updateEnemies());
  },
  movePlayer: () => {
    dispatch(movePlayer());
  },
  removeOffScreenEnemies: () => {
    dispatch(removeOffScreenEnemies());
  }
});

const mapStateToProps = ({ player, pixi: { screen }, enemies }) => ({
  player,
  screen,
  enemies
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
