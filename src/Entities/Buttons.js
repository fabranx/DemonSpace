
import Phaser from "phaser";

import { GameObjsNames } from "../Utils/Enums";


export class FullscreenButton extends Phaser.GameObjects.Image {
  constructor(scene) {
    super(scene);
    const padding = 10;
    this.fullscreenButton = scene.add.image(scene.scale.width - padding, scene.scale.height - padding, GameObjsNames.FULLSCREEN);
    this.fullscreenButton.setScale(0.07, 0.07);
    this.fullscreenButton.setOrigin(1, 1);
    this.fullscreenButton.setDepth(100);
    this.fullscreenButton.setInteractive({ useHandCursor: true }).on('pointerdown', function () {
      if (this.scene.scale.isFullscreen) {
        this.scene.scale.stopFullscreen();
      } else {
        this.scene.scale.startFullscreen();
      }
    });
  }
}

export class PlayButton extends Phaser.GameObjects.Image {
  constructor(scene, x, y) {
    super(scene);

    this.button = scene.add.image(x, y, GameObjsNames.PLAY);
    this.button.setScale(0.5, 0.5);
    this.button.setOrigin(0.5, 0);
    this.button.setDepth(100);
    this.button.setInteractive({ useHandCursor: true });
  }
}

export class PauseButton extends Phaser.GameObjects.Image {
  constructor(scene, x, y) {
    super(scene);

    this.button = scene.add.image(x, y, GameObjsNames.PAUSE);
    this.button.setScale(0.4, 0.4);
    this.button.setOrigin(0.5, 0);
    this.button.setDepth(100);
    this.button.setInteractive({ useHandCursor: true });
  }

}

export class SceneButton extends Phaser.GameObjects.Image {
  constructor(scene, text, x, y) {
    super(scene);

    this.button = scene.add.text(x, y, text, {
      fontFamily: 'PixelLCD',
      fontSize: '32px',
      color: '#ffffff',
      align: 'center',
      fixedWidth: 260,
      backgroundColor: '#6c1f1b'
    }).setPadding(32).setOrigin(0.5).setAlpha(0.9);

    this.button.setInteractive({ useHandCursor: true });

    this.button.on('pointerover', () => {
      this.button.setBackgroundColor('#d8665f');
    });

    this.button.on('pointerout', () => {
      this.button.setBackgroundColor('#6c1f1b');
    });
  }
}