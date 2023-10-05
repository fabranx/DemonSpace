import Phaser from "phaser";


export class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene) {
		super(scene, 20, 20, 'bullet');
		this.speed = Phaser.Math.GetSpeed(400, 1);
		this.angleRad = Phaser.Math.Angle.Between(0, 0, 0, 1);
		this.incX = 0;
		this.incY = 0;
		this.damage = 1;
		this.breakthrough = 1;

		this.collisionWith = null;;
	}

	fire(x, y) {
		this.setRotation(this.angleRad - Math.PI / 2);
		this.incX = Math.cos(this.angleRad);
		this.incY = Math.sin(this.angleRad);

		this.setPosition(x, y - 50);
		this.setActive(true);
		this.setVisible(true);
	}

	hit() {
		this.breakthrough -= 1;
		if (this.breakthrough <= 0) {
			this.destroy();
			return;
		}
	}


	setStats({ speed, angle, damage, breakthrough }) {
		if (speed) {
			this.speed = Phaser.Math.GetSpeed(speed, 1);
		}
		if (angle) {
			this.angleRad = angle;
		}
		if (damage) {
			this.setScale(damage, damage);
			this.damage = damage;
		}
		if (breakthrough) {
			this.breakthrough = breakthrough
		}
	}

	update(time, delta) {
		this.x -= this.incX * (this.speed * delta);
		this.y -= this.incY * (this.speed * delta);

		if (this.y < -50) {
			this.setActive(false);
			this.setVisible(false);
			this.destroy();
		}
	}
}