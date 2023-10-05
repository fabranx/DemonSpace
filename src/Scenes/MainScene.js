import Phaser from "phaser";

import { Animations, GameObjsNames, Events, Scenes } from "../Utils/Enums";

import { Alien1A, Alien1B, Alien1C, Alien1D, Alien2A, Alien2B } from "../Entities/Alien";
import { Player } from "../Entities/Player";
import { PLayerHealthBar } from "../Entities/HealtBars/PlayerHealtBar";
import { PUCollection } from "../Entities/PowerUp";
import { PauseButton } from "../Entities/Buttons";
import { Sounds } from "../Utils/Enums";

export class MainScene extends Phaser.Scene {
	constructor() {
		super(Scenes.MAIN);

		this.player = null;
		this.cursors = null;
		this.background = null;
		this.dustBackground = null;
		this.enemies1A = null;
		this.enemies1B = null;
		this.enemies1C = null;
		this.enemies1D = null;
		this.enemies2A = null;
		this.enemies2B = null;
		this.enemiesTypeGroup = [];
	}

	create() {
		this.game.sound.stopAll();


		this.music = this.sound.add(Sounds.MUSIC);
		this.music.addMarker({
			name: 'loop',
			start: 0,
			duration: 97,
			config: {
				loop: true,
				volume: 0.4,
			}
		});

		this.music.play('loop');

		this.scene.launch(Scenes.UI);

		this.score = 0;
		this.highScore = parseInt(localStorage.getItem('score')) || 0;

		this.alienSpawnManager = {
			spawnNum: {
				alien1A: 1,
				alien1B: -5,
				alien1C: -10,
				alien1D: -20,
				alien2A: -15,
				alien2B: -25,
			}
		}

		this.gameTimer = this.time.addEvent({
			delay: 999999999,
			paused: false
		})

		this.createAnimations();

		this.physics.world.setBoundsCollision(true, true, true, true);

		this.background = this.add.image(0, 0, GameObjsNames.BACKGROUND).setOrigin(0, 0);
		this.flippedBackground = this.add.image(0, -this.background.displayHeight, this.background.texture).setOrigin(this.background.originX, this.background.originY).setFlipY(true);

		this.dustBackground = this.add.image(0, 0, GameObjsNames.DUSTBACKGROUND)
			.setOrigin(0, 0)
			.setScale(1.4, 1.4)
			.setAlpha(0.7);

		this.flippedDustBackground = this.add.image(0, -this.dustBackground.displayHeight, this.dustBackground.texture)
			.setOrigin(this.dustBackground.originX, this.dustBackground.originY)
			.setFlipY(true)
			.setScale(this.dustBackground.scaleX, this.dustBackground.scaleY)
			.setAlpha(this.dustBackground.alpha);


		this.pauseGame = () => {
			this.scene.pause();
			this.scene.launch(Scenes.PAUSE);
		}

		this.input.keyboard.on('keydown-P', () => {
			this.pauseGame();
		})


		this.pauseButton = new PauseButton(this, this.scale.width / 2, 20)
		this.pauseButton.button.on('pointerdown', () => {
			this.pauseGame();
		})

		this.events.on('resume', () => {
			this.cameras.main.setAlpha(1);
			this.pauseButton.button.setVisible(true);
		}, this)

		this.events.on('pause', () => {
			this.cameras.main.setAlpha(0.5);
			this.pauseButton.button.setVisible(false);
		}, this)

		this.cursors = this.input.keyboard.createCursorKeys();

		this.player = this.physics.add.existing(new Player(this, this.scale.width / 2, this.scale.height - 60));

		this.playerHealthBar = new PLayerHealthBar(this, 20, this.scale.height - 20, () => this.player.getLife());

		this.puCollection = new PUCollection();

		this.createEnemiesGroups();

		this.addCollisions();

		this.spawnTimeEvent = this.time.addEvent({
			delay: 2000, callback: this.spawnEnemy, callbackScope: this, loop: true
		})

		this.difficultyTimeEvent = this.time.addEvent({
			delay: 30000, callback: () => {
				this.dropPowerUp();
				Object.keys(this.alienSpawnManager.spawnNum).map(key => {
					// if(this.alienSpawnManager.spawnNum[key] <= 20) {  // max n to spawn for enemy    
					this.alienSpawnManager.spawnNum[key] += 1;
					// }
				})
			}, callbackScope: this, loop: true
		})

		this.events.on('shutdown', () => {
			this.events.off(Events.UPDATE_SCORE);
		})
	}

	addCollisions() {
		for (let enemy of this.enemiesTypeGroup) {
			this.physics.add.overlap(this.player.gun.bulletsGroup, enemy, onCollideBulletAlien, checkOnceCollision, this);
			this.physics.add.overlap(this.player, enemy, onCollidePlayerAlien, null, this);
		}

		function checkOnceCollision(bullet, alien) {
			// if bullet is already collide with one alien instance, then return false for not calling the "onCollideBulletAlien" function
			if (bullet.collisionWith === alien) {
				return false;
			}
			bullet.collisionWith = alien
			return true;
		}

		function onCollideBulletAlien(bullet, alien) {
			if (!alien.IsDead) {
				alien.hit(bullet.damage);
			}

			if (alien.IsDead) {
				this.score += alien.pointsOnKill;
				this.events.emit(Events.UPDATE_SCORE, this.score);
			}
			bullet.hit();
		}

		function onCollidePlayerAlien(player, alien) {
			if (!player.isDead) {
				player.hit(alien.damage);
				alien.kill();

				if (player.life <= 0) {
					player.explode(() => {
						this.scene.pause();
						this.scene.pause(Scenes.UI);
						this.scene.launch(Scenes.GAMEOVER);
					})
				}
			}
		}
	}


	dropPowerUp() {
		let randomPU = this.puCollection.getRandomElement();
		if (randomPU) {
			let selectedPU = this.physics.add.existing(new randomPU(this, Phaser.Math.Between(20, this.scale.width - 20), this.player.y));

			this.physics.add.overlap(this.player, selectedPU, onCollidePlayerPowerup, null, this);

			function onCollidePlayerPowerup(player, powerup) {
				powerup.pickUp();

				const text = this.add.text(powerup.x, powerup.y - 50, `${powerup.name} + ${powerup.value}${powerup.unitMeasure}`, { fontSize: '20px', fontFamily: 'PixelLCD', fill: '#888888' }).setOrigin(0.5, 0.5);
				this.time.addEvent({
					delay: 2000, 
					callback: function () {
						text.destroy();
					},
					callbackScope: this
				})
				powerup.destroy();
			}
		}
	}

	createEnemiesGroups() {
		this.enemies1A = this.physics.add.group(
			{
				active: true,
				classType: Alien1A,
				maxSize: -1,
				x: 0, y: 0,
				runChildUpdate: true,
				enable: true
			}
		)
		this.enemies1B = this.physics.add.group(
			{
				active: true,
				classType: Alien1B,
				maxSize: -1,
				x: 0, y: 0,
				runChildUpdate: true,
				enable: true
			}
		)

		this.enemies1C = this.physics.add.group(
			{
				active: true,
				classType: Alien1C,
				maxSize: -1,
				x: 0, y: 0,
				runChildUpdate: true,
				enable: true
			}
		)
		this.enemies1D = this.physics.add.group(
			{
				active: true,
				classType: Alien1D,
				maxSize: -1,
				x: 0, y: 0,
				runChildUpdate: true,
				enable: true
			}
		)
		this.enemies2A = this.physics.add.group(
			{
				active: true,
				classType: Alien2A,
				maxSize: 20,
				x: 0, y: 0,
				runChildUpdate: true,
				enable: true
			}
		)
		this.enemies2B = this.physics.add.group(
			{
				active: true,
				classType: Alien2B,
				maxSize: 10,
				x: 0, y: 0,
				runChildUpdate: true,
				enable: true
			}
		)

		this.enemiesTypeGroup = [this.enemies1A, this.enemies1B, this.enemies1C, this.enemies1D, this.enemies2A, this.enemies2B]
	}

	spawnEnemy() {
		for (let i = 0; i < this.alienSpawnManager.spawnNum.alien1A; i++) {
			this.enemies1A.create(Phaser.Math.Between(20, this.scale.width - 20), Phaser.Math.Between(-20, -200));
		}
		for (let i = 0; i < this.alienSpawnManager.spawnNum.alien1B; i++) {
			this.enemies1B.create(Phaser.Math.Between(20, this.scale.width - 20), Phaser.Math.Between(-20, -200));
		}
		for (let i = 0; i < this.alienSpawnManager.spawnNum.alien1C; i++) {
			this.enemies1C.create(Phaser.Math.Between(20, this.scale.width - 20), Phaser.Math.Between(-20, -200));
		}
		for (let i = 0; i < this.alienSpawnManager.spawnNum.alien1D; i++) {
			this.enemies1D.create(Phaser.Math.Between(20, this.scale.width - 20), Phaser.Math.Between(-20, -200));
		}
		for (let i = 0; i < this.alienSpawnManager.spawnNum.alien2A; i++) {
			this.enemies2A.create(Phaser.Math.Between(20, 50), Phaser.Math.Between(-100, -200))  // left side
			this.enemies2A.create(Phaser.Math.Between(this.scale.width - 20, this.scale.width - 50), Phaser.Math.Between(-100, -200));  // right side
		}
		for (let i = 0; i < this.alienSpawnManager.spawnNum.alien2B; i++) {
			this.enemies2B.create(Phaser.Math.Between(20, 50), Phaser.Math.Between(-100, -200))  // left side
			this.enemies2B.create(Phaser.Math.Between(this.scale.width - 20, this.scale.width - 50), Phaser.Math.Between(-100, -200)); // right side
		}
		this.spawnTimeEvent.delay = Phaser.Math.Between(2000, 5000);
	}

	createAnimations() {

		if (!this.anims.exists(Animations.keys.ALIENEXPLOSION)) {
			this.anims.create({
				key: Animations.keys.ALIENEXPLOSION,
				frames: Animations.frames.GASEXPLOSION1,
				frameRate: 50,
				showOnStart: true,
				hideOnComplete: true,
			});
		}

		if (!this.anims.exists(Animations.keys.SHIPEXPLOSION)) {
			this.anims.create({
				key: Animations.keys.SHIPEXPLOSION,
				frames: Animations.frames.EXPLOSION3,
				frameRate: 20,
				showOnStart: true,
				hideOnComplete: true
			});
		}

		if (!this.anims.exists(Animations.keys.SHIPENGINE)) {
			this.anims.create({
				key: Animations.keys.SHIPENGINE,
				frames: Animations.frames.ENGINE,
				frameRate: 20,
				showOnStart: true,
				repeat: -1,
			});
		}
	}

	update(time, delta) {

		this.playerHealthBar.draw();
		this.player.update(time);

		this.moveBackground(this.background, this.flippedBackground, 0.8);
		this.moveBackground(this.dustBackground, this.flippedDustBackground, 1);
	}

	moveBackground(background, YflippedBackground, speed) {

		background.y += speed;
		YflippedBackground.y += speed;

		if (background.y > this.scale.height) {
			background.y = YflippedBackground.y - YflippedBackground.displayHeight;  // displayHeight:  actual image height shown on screen
		}

		if (YflippedBackground.y > this.scale.height) {
			YflippedBackground.y = background.y - background.displayHeight;
		}
	}

}