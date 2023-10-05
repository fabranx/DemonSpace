import Phaser from "phaser";
import { Scenes } from "../Utils/Enums";
import { SceneButton } from "../Entities/Buttons";
import { PlayButton } from "../Entities/Buttons";


export class PauseScene extends Phaser.Scene {

  constructor() {
    super({ key: Scenes.PAUSE, active: false });
  }

  create() {
    this.game.sound.pauseAll();

    this.add.text(this.scale.width / 2, 300, 'PAUSE', { fontSize: '48px', fontFamily: 'PixelLCD', fill: '#ffffff' }).setOrigin(0.5, 0.5);

    this.restartButton = new SceneButton(this, 'RETRY', this.scale.width / 2, this.scale.height / 2 + 100);
    this.restartButton.button.on('pointerdown', () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.start(Scenes.MAIN);
      });
    });

    this.exitButton = new SceneButton(this, 'EXIT', this.scale.width / 2, this.scale.height / 2 + 200);
    this.exitButton.button.on('pointerdown', () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.stop(Scenes.MAIN);
        this.scene.stop(Scenes.UI);
        this.scene.start(Scenes.MENU);
      });

    })

    this.resume = () => {
      this.scene.stop();
      this.scene.resume(Scenes.MAIN);
      this.game.sound.resumeAll();
    }

    this.play = new PlayButton(this, this.scale.width / 2, 0);
    this.play.button.on('pointerdown', () => {
      this.resume();
    })

    this.input.keyboard.on('keydown-P', () => {
      this.resume();
    })

  }
}
