import Phaser from "phaser";
import { Gun } from "./PlayerGun";
import { Animations, GameObjsNames, Sounds } from "../Utils/Enums";

export class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, GameObjsNames.SHIP);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setScale(1.5, 1.5);
		this.setOrigin(0.5, 0.5);
		this.setCollideWorldBounds(true);

		this.setSize(this.width / 2, this.height / 2, true);

		this.isDead = false;
		this.initialLife = 150;
		this.life = this.initialLife;
		this.recoveryRate = 5;
		this.shipSpeed = 200;

		this.gun = new Gun(scene, 1, 500, 1, 600);


		this.lifeRecoveryTimeEvent = this.scene.time.addEvent({
			delay: 5000, callback: this.lifeRecovery, callbackScope: this, loop: true
		});

		this.cursors = this.scene.input.keyboard.createCursorKeys();
		this.keys = this.scene.input.keyboard.addKeys('W,A,S,D');


		this.engine = this.scene.add.sprite(0, 0)
			.setOrigin(0.5, 0.5)
			.setScale(1.5, 1.5)

		this.engine.play(Animations.keys.SHIPENGINE, true);
	}

	lifeRecovery() {
		if (this.life < this.initialLife) {
			this.life += this.recoveryRate;
		}
		if (this.life > this.initialLife) {
			this.life = this.initialLife;
		}
	}

	getLife() {
		return {
			currentLife: this.life >= 0 ? this.life : 0,
			maxLife: this.initialLife,
		}
	}

	increaseLife(percValue) {
		this.initialLife = Math.round(this.initialLife * (1 + (percValue / 100)));
		this.life = this.initialLife;
		this.recoveryRate += 5;
	}

	increaseSpeed(percValue) {
		this.shipSpeed *= (1 + percValue / 100);
	}

	increaseGuns(value) {
		if (this.gun.guns + value < 5) {
			this.gun.guns += value;
		}
		else {
			this.gun.guns = 5;
		}
	}

	increaseBulletRate(percValue) {
		this.gun.bulletFireRate *= (1 - (percValue / 100));
	}

	increaseBulletPower(percValue) {
		this.gun.bulletDamage *= (1 + (percValue / 100));
	}

	increaseBulletVelocity(percValue) {
		this.gun.bulletSpeed *= (1 + (percValue / 100));
	}

	increaseBulletBreakthrough(value) {
		this.gun.bulletBreakthrough += value;
	}


	shoot(time) {
		this.gun.shoot(time, this.x, this.y + 20);
	}

	hit(damage) {
		this.scene.sound.play(Sounds.CRASH, { volume: 0.7 });
		this.life -= damage;
		this.setTint(0xff0000);
		this.setAlpha(0.6);
		this.hitTimeEvent = this.scene.time.addEvent({ delay: 150, callback: this.clear, callbackScope: this });
	}

	clear() {
		this.clearTint();
		this.clearAlpha();
	}

	explode(callback) {
		if (!this.isDead) {  // for run explosion one time
			const explosion = this.scene.add.sprite(0, 0)
				.setOrigin(0.5, 0.5)
				.setScale(5, 5)
				.setRotation(Phaser.Math.Between(0, Phaser.Math.PI2))
				.copyPosition(this);

			this.setVelocityX(0);
			this.setActive(false);
			this.setVisible(false);

			this.engine.destroy();

			explosion.play(Animations.keys.SHIPEXPLOSION, true);
			this.scene.sound.play(Sounds.BOOM);

			explosion.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
				this.destroy();
				callback();
			}, this);

			this.isDead = true;
		}
	}

	update(time) {
		this.engine.copyPosition(this);
		if (!this.isDead) {

			this.setVelocityX(0);

			if (this.keys.A.isDown) {
				this.setVelocityX(-this.shipSpeed);
			}
			else if (this.keys.D.isDown) {
				this.setVelocityX(this.shipSpeed);
			}

			if (this.cursors.up.isDown) {
				this.shoot(time);
			}
		}
	}
}
