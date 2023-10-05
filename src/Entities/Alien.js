import Phaser from "phaser"
import { Animations, GameObjsNames, Sounds } from "../Utils/Enums"
import { EnemyHealthBar } from "./HealtBars/EnemyHealtBar"

class Alien extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		this.setOrigin(0.5, 1);
		this.setVisible(true);
		this.setActive(true);
		this.setScale(0.5, 0.5);
		this.IsDead = false;

		this.life = 1;
		this.speed = Phaser.Math.GetSpeed(1, 1);
		this.explosionAnim = Animations.keys.ALIENEXPLOSION;

		this.player = scene.player;

		this.initialPointTarget = {
			x: this.x,
			y: Phaser.Math.Between(20, (this.scene.scale.height / 2) + 20)
		}

		this.sound_hit = Sounds.ALIEN1A_HIT;
		this.sound_death = Sounds.ALIEN_DEATH;

		this.damage = null;;
		this.pointsOnKill = null;
		this.healthBar = null;
	}

	hit(damage) {

		this.scene.sound.play(this.sound_hit, { volume: 0.6 });

		this.life -= damage;
		this.speed /= 2;
		this.setTint(0xff0000);
		this.setAlpha(0.6);
		this.timedEvent = this.scene.time.addEvent({ delay: 150, callback: this.clear, callbackScope: this });

		this.healthBar.decrease(damage);

		if (!this.IsDead && this.life <= 0) {  // for run explosion one time
			this.kill(true);
		}
	}

	clear() {
		this.clearTint();
		this.clearAlpha();
		this.speed *= 2;
	}

	kill(showPoints) {
		this.scene.sound.play(this.sound_death, { volume: 0.5 });

		const explosion = this.scene.add.sprite(0, 0)
		.setOrigin(0.5, 0.7)
		.setScale(3, 3)
		.copyPosition(this);

		explosion.play(this.explosionAnim, true);

		if(showPoints) {
			const textPoints = this.scene.add.text(this.x, this.y, `+${this.pointsOnKill}`, { fontSize: 40, fontFamily: 'PixelLCD', fill: '#aa7d2a' }).setOrigin(0.5, 0).setDepth(2);

			explosion.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
				textPoints.destroy();
			}, this);
		}

		this.speed = 0;
		this.destroy();
		this.healthBar.delete();
		this.IsDead = true;
	}

	update(time, delta) {
		this.healthBar.draw(this.x, this.y - 20);

		if (this.scene) {
			if (this.y >= this.initialPointTarget.y) {
				this.scene.physics.moveToObject(this, this.player, this.speed);
			}
			else {
				this.scene.physics.moveTo(this, this.initialPointTarget.x, this.initialPointTarget.y, this.speed);
			}
		}
	}

}


export class Alien1A extends Alien {
	constructor(scene, x, y) {
		super(scene, x, y, GameObjsNames.ALIEN1A);
		this.explosionAnim = Animations.keys.ALIENEXPLOSION;
		this.speed = 60;
		this.life = 2;
		this.damage = 10;
		this.pointsOnKill = 5;
		this.healthBar = new EnemyHealthBar(scene, this.x, this.y, this.life);
		this.sound_hit = Sounds.ALIEN1A_HIT;
	}
}

export class Alien1B extends Alien {
	constructor(scene, x, y) {
		super(scene, x, y, GameObjsNames.ALIEN1B);
		this.explosionAnim = Animations.keys.ALIENEXPLOSION;
		this.speed = 50;
		this.life = 10;
		this.damage = 15;
		this.pointsOnKill = 10;
		this.setScale(0.6, 0.6);
		this.healthBar = new EnemyHealthBar(scene, this.x, this.y, this.life);
		this.sound_hit = Sounds.ALIEN1B_HIT;

	}
}

export class Alien1C extends Alien {
	constructor(scene, x, y) {
		super(scene, x, y, GameObjsNames.ALIEN1C);
		this.explosionAnim = Animations.keys.ALIENEXPLOSION;
		this.speed = 50;
		this.life = 20;
		this.damage = 20;
		this.pointsOnKill = 20;
		this.setScale(0.7, 0.7);
		this.healthBar = new EnemyHealthBar(scene, this.x, this.y, this.life);
		this.sound_hit = Sounds.ALIEN1C_HIT;

	}
}

export class Alien1D extends Alien {
	constructor(scene, x, y) {
		super(scene, x, y, GameObjsNames.ALIEN1D);
		this.explosionAnim = Animations.keys.ALIENEXPLOSION;
		this.speed = 45;
		this.life = 50;
		this.setScale(0.8, 0.8);
		this.damage = 25;
		this.pointsOnKill = 50;
		this.healthBar = new EnemyHealthBar(scene, this.x, this.y, this.life);
		this.sound_hit = Sounds.ALIEN1D_HIT;

	}
}


export class Alien2A extends Alien {
	constructor(scene, x, y) {
		super(scene, x, y, GameObjsNames.ALIEN2A);
		this.explosionAnim = Animations.keys.ALIENEXPLOSION;
		this.speed = 70;
		this.life = 15;
		this.damage = 10;
		this.pointsOnKill = 25;

		this.initialPointTarget = {
			// if this alien spawn on left side of screen, the x of the point is 20 else the width of screen minus 20
			// y random value between middle height of screen -80 and +20
			x: this.x / (this.scene.scale.width / 2) >= 1 ? this.scene.scale.width - 20 : 20,
			y: Phaser.Math.Between((this.scene.scale.height / 3) * 2, (this.scene.scale.height / 3) * 2)
		}
		this.healthBar = new EnemyHealthBar(scene, this.x, this.y, this.life);
		this.sound_hit = Sounds.ALIEN2A_HIT;

	}
}

export class Alien2B extends Alien {
	constructor(scene, x, y) {
		super(scene, x, y, GameObjsNames.ALIEN2B);
		this.explosionAnim = Animations.keys.ALIENEXPLOSION;
		this.speed = 60;
		this.life = 40;
		this.setScale(0.7, 0.7);
		this.damage = 20;
		this.pointsOnKill = 40;

		this.initialPointTarget = {
			x: this.x / (this.scene.scale.width / 2) >= 1 ? this.scene.scale.width - 20 : 20,
			y: Phaser.Math.Between((this.scene.scale.height / 2) - 80, (this.scene.scale.height / 2) + 20)
		}
		this.healthBar = new EnemyHealthBar(scene, this.x, this.y, this.life);
		this.sound_hit = Sounds.ALIEN2B_HIT;

	}
}

// 		explosion.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
// 			this.destroy();
// 		}, this);
