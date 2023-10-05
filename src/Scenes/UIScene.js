import Phaser from "phaser";
import { Events, Scenes } from "../Utils/Enums";

export class UIScene extends Phaser.Scene {

  constructor() {
    super(Scenes.UI);
  }

  create() {

    //  Grab a reference to the Game Scene
    let game = this.scene.get(Scenes.MAIN);

    let scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '36px', fontFamily: 'PixelLCD', fill: '#ffffff', });
    let highScoreText = this.add.text(this.scale.width - 10, 10, `Record: ${game.highScore}`, { fontSize: '36px', fontFamily: 'PixelLCD', fill: '#d9df41', }).setOrigin(1, 0);

    //  Listen for events from it
    game.events.on(Events.UPDATE_SCORE, function (score) {
      scoreText.setText('Score: ' + score);
    }, this);

    this.events.on('shutdown', () => {
      this.events.off(Events.UPDATE_SCORE);
      this.events.removeListener(Events.UPDATE_SCORE);
    })
  }
}
