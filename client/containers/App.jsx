import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { keydown, keyup } from "../actions/keyboard";

import {
  movePlayer,
  setPosition,
  updateMissiles,
  removeOffscreenMissiles,
  checkPlayerAlive
} from "../actions/player";

import { setScreenSize } from "../actions/pixi";

import {
  placeInitialEnemies,
  updateEnemies,
  removeOffScreenEnemies,
  checkEnemyMissileColisions,
  enemiesFire,
  enemyMissilesMove,
  removeOffScreenEnemyMissiles
} from "../actions/enemy";

import Loop from "./Loop";
import Stage from "./Stage";
import Sprite from "../components/Sprite";
import KeyboardEvents from "./KeyboardEvents";
import Score from "../components/Score";
import Text from "../components/Text";

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
    const { screen } = this.props;

    return (
      <Loop onTick={this.onTick}>
        <KeyboardEvents onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp}>
          {this.currentScene}
        </KeyboardEvents>
      </Loop>
    );
  }

  get currentScene() {
    const { game } = this.props;
    switch (game.state) {
      case "playing":
        return this.playingScene;
      case "gameover":
        return this.gameoverScene;
      case "title":
        return this.titleScene;
      default:
        return null;
    }
  }

  get titleScene() {
    const { screen } = this.props;

    return (
      <Stage
        backgroundColor={0x000000}
        width={screen.width}
        height={screen.height}
      >
        <Text
          text={
            "Paper Pirates!\n\nProtect your harbor\n and\n avoid missiles\n\nPress Enter to Start"
          }
          x={screen.width / 2}
          y={screen.height / 2}
          style={{
            fill: 0xffffff,
            stroke: 0xffffff,
            fontSize: "56pt",
            align: "center"
          }}
        />
      </Stage>
    );
  }

  get gameoverScene() {
    const {
      screen,
      player: { score }
    } = this.props;

    return (
      <Stage
        backgroundColor={0x000000}
        width={screen.width}
        height={screen.height}
      >
        <Text
          text={"Game Over\nPress Enter to Start Over"}
          x={screen.width / 2}
          y={screen.height / 2}
          style={{
            fill: 0xffffff,
            stroke: 0xffffff,
            fontSize: "56pt",
            align: "center"
          }}
        />
        <Score key={"score"} score={score} />
      </Stage>
    );
  }

  get playingScene() {
    const { player, screen } = this.props;
    const { position } = player;

    return (
      <Stage
        backgroundColor={gameBackgroundColor}
        width={screen.width}
        height={screen.height}
      >
        <Sprite
          key={"player"}
          width={playerWidth}
          height={playerHeight}
          x={position.x}
          y={position.y}
          filename={"player.png"}
        />
        {this.enemies}
        {this.playerMissiles}
        {this.enemyMissiles}
        <Score key={"score"} score={player.score} />
      </Stage>
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

  get enemyMissiles() {
    const { enemyMissiles } = this.props;

    return _.map(enemyMissiles, missile => {
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
          key={enemy.id}
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
    const { game } = this.props;
    if (game.state !== "playing") {
      return;
    }

    this.props.checkPlayerAlive();
    this.props.movePlayer();
    this.props.updateEnemies();
    this.props.updateMissiles();
    this.props.removeOffScreenEnemies();
    this.props.removeOffscreenMissiles();
    this.props.checkEnemyMissileColisions();
    this.props.enemiesFire();
    this.props.enemyMissilesMove();
    this.props.removeOffScreenEnemyMissiles();
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
  },
  enemiesFire: () => {
    dispatch(enemiesFire());
  },
  enemyMissilesMove: () => {
    dispatch(enemyMissilesMove());
  },
  removeOffScreenEnemyMissiles: () => {
    dispatch(removeOffScreenEnemyMissiles());
  },
  checkPlayerAlive: () => {
    dispatch(checkPlayerAlive());
  }
});

const mapStateToProps = ({
  player,
  pixi: { screen },
  enemies,
  enemyMissiles,
  game
}) => ({
  player,
  screen,
  enemies,
  enemyMissiles,
  game
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
