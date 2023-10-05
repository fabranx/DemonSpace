export class EnemyHealthBar {

  constructor(scene, x, y, health) {
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.bar.setDepth(5);

    this.internalWidth = 66;
    this.internalHeight = 10;
    this.externalWidth = 70;
    this.externalHeigth = 14;
    this.xpadding = (this.externalWidth - this.internalWidth) / 2;
    this.ypadding = (this.externalHeigth - this.internalHeight) / 2;

    this.x = x;
    this.y = y;
    this.value = health;
    this.healthUnit = this.internalWidth / health;

    scene.add.existing(this.bar);
  }

  decrease(amount) {
    this.value -= amount;

    if (this.value < 0) {
      this.value = 0;
    }

    this.draw();

    return (this.value === 0);
  }

  draw(x, y) {
    this.bar.clear();

    let xpos = x - this.externalWidth / 2;
    let ypos = y - 50;

    //  BG
    this.bar.fillStyle(0x000000);
    this.bar.fillRect(xpos, ypos, this.externalWidth, this.externalHeigth);

    //  Health

    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(xpos + this.xpadding, ypos + this.ypadding, this.internalWidth, this.internalHeight);


    this.bar.fillStyle(0xff0000);
    let width = Math.floor(this.healthUnit * this.value);
    this.bar.fillRect(xpos + this.xpadding, ypos + this.ypadding, width, this.internalHeight);
  }

  delete() {
    this.bar.destroy();
  }

}