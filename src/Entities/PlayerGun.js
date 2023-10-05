import { Sounds } from "../Utils/Enums"
import { Bullet } from "./Bullet"

export class Gun {
  constructor(scene, guns = 1, bulletFireRate = 800, bulletDamage = 1, bulletSpeed = 400, bulletBreakthrough = 1) {
    this.scene = scene;

    this.guns = guns;
    this.bulletFireRate = bulletFireRate;
    this.bulletDamage = bulletDamage;
    this.bulletSpeed = bulletSpeed;
    this.bulletBreakthrough = bulletBreakthrough;

    this.lastFired = 0;

    this.bulletsGroup = scene.physics.add.group({
      classType: Bullet,
      maxSize: -1,
      runChildUpdate: true,
    });
  }

  shoot(time, player_x, player_y) {

    if (time > this.lastFired) {
      const bullets = this.createBullets();

      this.scene.sound.play(Sounds.BULLETSOUND, {
        volume: 1
      });

      switch (bullets.length) {
        case 1:
          bullets[0].fire(player_x, player_y);
          break;

        case 2:
          bullets[0].fire(player_x - 20, player_y);
          bullets[1].fire(player_x + 20, player_y);
          break;

        case 3:
          bullets[0].fire(player_x, player_y);
          bullets[1].fire(player_x - 20, player_y);
          bullets[2].fire(player_x + 20, player_y);
          break;

        case 4:
          bullets[0].fire(player_x - 20, player_y);
          bullets[1].fire(player_x + 20, player_y);
          bullets[2].fire(player_x - 30, player_y);
          bullets[3].fire(player_x + 30, player_y);
          break;

        case 5:
          bullets[0].fire(player_x, player_y);
          bullets[1].fire(player_x - 20, player_y);
          bullets[2].fire(player_x + 20, player_y);
          bullets[3].fire(player_x - 30, player_y);
          bullets[4].fire(player_x + 30, player_y);
          break;

        default:
          bullets[0].fire(player_x, player_y);
          break;
      }
      this.lastFired = time + this.bulletFireRate;
    }
  }


  createBullets() {
    let bullets = [];
    for (let i = 0; i < this.guns; i++) {
      bullets[i] = this.bulletsGroup.get();
      bullets[i].body.onCollide = true;
      bullets[i].setStats({ speed: this.bulletSpeed, damage: this.bulletDamage, breakthrough: this.bulletBreakthrough });
    }

    switch (bullets.length) {
      case 1: // bullets[0]: default angle, down to up
        break;
      case 2: // bullets[0] and bullets[1]: default angle, down to up
        break;
      case 3:
        // bullets[0]: default angle, down to up
        bullets[1].setStats({ angle: Phaser.Math.Angle.Between(0, 0, 1, 6) });
        bullets[2].setStats({ angle: Phaser.Math.Angle.Between(2, 0, 1, 6) });
        break;
      case 4:
        // bullets[0] and bullets[1]: default angle, down to up                
        bullets[2].setStats({ angle: Phaser.Math.Angle.Between(0, 0, 1, 5) });
        bullets[3].setStats({ angle: Phaser.Math.Angle.Between(2, 0, 1, 5) });
        break;
      case 5:
        // bullets[0]: default angle, down to up
        bullets[1].setStats({ angle: Phaser.Math.Angle.Between(0, 0, 1, 6) });
        bullets[2].setStats({ angle: Phaser.Math.Angle.Between(2, 0, 1, 6) });
        bullets[3].setStats({ angle: Phaser.Math.Angle.Between(0, 0, 1, 3) });
        bullets[4].setStats({ angle: Phaser.Math.Angle.Between(2, 0, 1, 3) });
        break;
      default:
        break;
    }
    return bullets;
  }
}
