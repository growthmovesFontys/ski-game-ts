import Phaser from "phaser";
import { StartScene } from "../scenes";
import { SkieGame } from "../scenes";

const resizeGame = (game: Phaser.Game) => {
  const canvas = game.canvas;
  const window_width = window.innerWidth;
  const window_height = window.innerHeight;
  const window_ratio  = window_width / window_height;
  const game_ratio = canvas.width / canvas.height;

  if ( window_ratio  < game_ratio) {
    canvas.style.width = window_width + 'px';
    canvas.style.height = (window_width / game_ratio) + 'px';
  } else {
    canvas.style.width = (window_height * game_ratio) + 'px';
    canvas.style.height = window_height + 'px';
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#0b8cef",
  input: {
    keyboard: true
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  scene: [StartScene, SkieGame],
};

const game = new Phaser.Game(config);

window.onload = () => {
  resizeGame(game);
}

window.onresize = () => {
  resizeGame(game);
}

export default game;
