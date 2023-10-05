import { SceneButton } from '../Entities/Buttons'
import { Scenes } from '../Utils/Enums'

export class MenuScene extends Phaser.Scene {
  constructor() {
    super(Scenes.MENU);
  }

  create() {

    this.cameras.main.fadeIn(1000, 0, 0, 0);

    const menubg = this.add.image(this.scale.width / 2, this.scale.height / 2, 'Menubg').setOrigin(0.5, 0.5).setTint(0x00aaff).postFX.addBlur();
    const logo = this.add.image(this.scale.width / 2, this.scale.height / 3, 'Logo').setOrigin(0.5, 0.5);

    this.startButton = new SceneButton(this, 'START', this.scale.width / 2, this.scale.height / 2);

    this.startButton.button.on('pointerdown', () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.start(Scenes.MAIN);
      });
    })
  }
}
