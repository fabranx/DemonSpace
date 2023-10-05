export class PLayerHealthBar {

  constructor(scene, x, y, getPlayerLife) {
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.bar.setDepth(10);

    this.textBar = new Phaser.GameObjects.Text(scene, x, y, 'Life', { fontSize: '14px', fontFamily: 'PixelLCD', fill: '#ffffff' }).setDepth(5);

    this.internalWidth = 190;
    this.internalHeight = 5;
    this.externalWidth = 200;
    this.externalHeigth = 15;
    this.xpadding = (this.externalWidth - this.internalWidth) / 2;
    this.ypadding = (this.externalHeigth - this.internalHeight) / 2;

    this.x = x + this.textBar.width + 10;
    this.y = y;
    this.getPlayerLife = getPlayerLife;
    this.healthUnit = this.internalWidth / this.getPlayerLife().maxLife;

    scene.add.existing(this.bar);
    scene.add.existing(this.textBar);
  }


  draw() {
    const life = this.getPlayerLife();
    let lifeWidth = Math.floor(this.healthUnit * life.currentLife);
    let maxLifeWidth = Math.floor(this.healthUnit * life.maxLife);

    this.bar.clear();

    //  BG
    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.x, this.y, maxLifeWidth + (this.xpadding * 2), this.externalHeigth);

    //  Health

    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(this.x + this.xpadding, this.y + this.ypadding, maxLifeWidth, this.internalHeight);


    this.bar.fillStyle(0x00ff00);
    this.bar.fillRect(this.x + this.xpadding, this.y + this.ypadding, lifeWidth, this.internalHeight);
  }

  delete() {
    this.bar.destroy();
  }
}