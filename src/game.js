import Phaser from "phaser";
import '../style.css'
import { MainScene } from "./Scenes/MainScene";
import { UIScene } from "./Scenes/UIScene";
import { PauseScene } from "./Scenes/PauseScene";
import { GameOverScene } from "./Scenes/GameOverScene";
import { PreloadScene } from "./Scenes/PreloadScene";
import { MenuScene } from "./Scenes/InitialMenuScene";

const game = new Phaser.Game({   
  title: 'Demonspace',
  type: Phaser.AUTO,
  width: 1600,
  height: 900,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,

    // Minimum size
    min: {
        width: 800,
        height: 450
    },

    // Maximum size
    max: {
        width: 1600,
        height: 900
    },
    zoom: 1,  // Size of game canvas = game size * zoom
},
  autoRound: false,
  backgroundColor: '#000000', 
  scene: [PreloadScene, MenuScene, MainScene, UIScene, PauseScene, GameOverScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  },
});
