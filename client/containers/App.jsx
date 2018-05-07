import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { keydown, keyup } from "../actions/keyboard";

import {
  movePlayer,
  setPosition,
  updateMissiles,
  removeOffscreenMissiles
} from "../actions/player";

import { setScreenSize } from "../actions/pixi";

import {
  placeInitialEnemies,
  updateEnemies,
  removeOffScreenEnemies,
  checkEnemyMissileColisions
} from "../actions/enemy";

import Loop from "./Loop";
import Stage from "./Stage";
import Sprite from "../components/Sprite";
import KeyboardEvents from "./KeyboardEvents";
import Score from "../components/Score";

import {
  gameBackgroundColor,
  playerHeight,
  playerWidth,
  playerSpeed,
  enemyHeight,
  enemyWidth,
  screenHeight,
  screenWidth,
  missileWidth,
  missileHeight
} from "../constants";

class App extends Component {
  constructor(props) {
    super(props);
    this.props.setScreenSize(screenWidth, screenHeight);
    this.props.placeInitialEnemies();
  }

  render() {
    const { player, screen } = this.props;
    const { position } = player;

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
            {this.playerMissiles}
            <Score score={player.score} />
          </Stage>
        </KeyboardEvents>
      </Loop>
    );
  }

  get playerMissiles() {
    const {
      player: { missiles }
    } = this.props;
    return _.map(missiles, missile => {
      return (
        <Sprite
          key={missile.id}
          width={missileWidth}
          height={missileHeight}
          x={missile.x}
          y={missile.y}
          filename={"missile.png"}
        />
      );
    });
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
    this.props.updateMissiles();
    this.props.removeOffScreenEnemies();
    this.props.removeOffscreenMissiles();
    this.props.checkEnemyMissileColisions();
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
  },
  updateMissiles: () => {
    dispatch(updateMissiles());
  },
  removeOffscreenMissiles: () => {
    dispatch(removeOffscreenMissiles());
  },
  checkEnemyMissileColisions: () => {
    dispatch(checkEnemyMissileColisions());
  }
});

const mapStateToProps = ({ player, pixi: { screen }, enemies }) => ({
  player,
  screen,
  enemies
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
