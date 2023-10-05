import Phaser, { Scene } from "phaser";
import { Scenes } from "../Utils/Enums";
import { SceneButton } from "../Entities/Buttons";

export class GameOverScene extends Phaser.Scene {

  constructor() {
    super({ key: Scenes.GAMEOVER, active: false });
  }

  create() {
    this.game.sound.stopAll();

    let screenWidth = this.game.scale.width;
    let screenHeight = this.game.scale.height;
    this.add.text(screenWidth / 2, screenHeight / 2 - 60, 'GAME OVER', { fontSize: '40px', fontFamily: 'PixelLCD', fill: '#ff5544', }).setOrigin(0.5, 0.5);

    //  Grab a reference to the Main Scene
    let game = this.scene.get(Scenes.MAIN);
    let score = game.score;
    let highScore = game.highScore;

    if (score > highScore) {
      let highscoretext = this.add.text(screenWidth / 2, screenHeight / 2, `NEW HIGH SCORE: ${score}`, { fontSize: '40px', fontFamily: 'PixelLCD', fill: '#d9df41' }).setOrigin(0.5, 0.5);
      highscoretext.setAlpha(1);
      localStorage.setItem('score', score);

      this.tweens.add({
        targets: highscoretext,
        alpha: 0.6,
        ease: 'sine.in',
        duration: 400,
        repeat: -1,
        yoyo: true
      });
    }

    this.restartButton = new SceneButton(this, 'RETRY', this.scale.width / 2, this.scale.height / 2 + 100);
    this.exitButton = new SceneButton(this, 'EXIT', this.scale.width / 2, this.scale.height / 2 + 200);

    this.restartButton.button.on('pointerdown', () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.start(Scenes.MAIN);
      });
    })

    this.exitButton.button.on('pointerdown', () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.stop(Scenes.MAIN);
        this.scene.stop(Scenes.UI)
        this.scene.start(Scenes.MENU);
      });

    })
  }
}
