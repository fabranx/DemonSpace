import { Animations, GameObjsNames, Scenes, Sounds } from "../Utils/Enums";

import { FullscreenButton } from '../Entities/Buttons'


export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: Scenes.PRELOAD, active: true })
  }

  preload() {
    this.load.image(GameObjsNames.ALIEN1A, '../assets/Sprites/Aliens/Enemy_1_A_Small.png');
    this.load.image(GameObjsNames.ALIEN1B, '../assets/Sprites/Aliens/Enemy_1_B_Small.png');
    this.load.image(GameObjsNames.ALIEN1C, '../assets/Sprites/Aliens/Enemy_1_C_Small.png');
    this.load.image(GameObjsNames.ALIEN1D, '../assets/Sprites/Aliens/Enemy_1_D_Small.png');
    this.load.image(GameObjsNames.ALIEN2A, '../assets/Sprites/Aliens/Enemy_2_A_Small.png');
    this.load.image(GameObjsNames.ALIEN2B, '../assets/Sprites/Aliens/Enemy_2_B_Small.png');

    this.load.image(GameObjsNames.SHIP, '../assets/Sprites/Player/Frigate.png');
    this.load.image(GameObjsNames.BACKGROUND, '../assets/Backgrounds/SpaceBackground.png');
    this.load.image(GameObjsNames.DUSTBACKGROUND, '../assets/Backgrounds/DustBackground2.png')
    this.load.image(GameObjsNames.BULLET, '../assets/Sprites/Player/bullet.png');

    this.load.image(GameObjsNames.BULLETPOWER_PU, '../assets/PowerUp/Power_powerup.png');
    this.load.image(GameObjsNames.BULLETRATE_PU, '../assets/PowerUp/BulletRate_powerup.png');
    this.load.image(GameObjsNames.BULLETVELOCITY_PU, '../assets/PowerUp/VelocityBullet_powerup.png');
    this.load.image(GameObjsNames.GUNS_PU, '../assets/PowerUp/Guns_powerup.png');
    this.load.image(GameObjsNames.HEALTH_PU, '../assets/PowerUp/Health_powerup.png');
    this.load.image(GameObjsNames.SPEED_PU, '../assets/PowerUp/Speed_powerup.png');
    this.load.image(GameObjsNames.BULLETBREAKTHROUGH_PU, '../assets/PowerUp/Breakthrough_powerup.png');

    this.load.image(GameObjsNames.LOGO, '../assets/Logo3.png');
    this.load.image(GameObjsNames.FULLSCREEN, '../assets/fullscreen.png');
    this.load.image(GameObjsNames.MENUBG, '../assets/menubg2.png');
    this.load.image(GameObjsNames.PLAY, '../assets/PlayButton.png');
    this.load.image(GameObjsNames.PAUSE, '../assets/PauseButton.png');

    this.load.spritesheet(Animations.frames.EXPLOSION3, '../assets/Explosions/Explosion3_spritesheet.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet(Animations.frames.GASEXPLOSION1, '../assets/Explosions/GasExplosion1_spritesheet.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet(Animations.frames.ENGINE, '../assets/Sprites/Player/Frigate-Engine.png', { frameWidth: 64, frameHeight: 64 });


    this.load.audio(Sounds.BULLETSOUND, '../assets/Audio/Player/laser4.mp3')
    this.load.audio(Sounds.PUSOUND, '../assets/Audio/bonus.wav')
    this.load.audio(Sounds.BOOM, '../assets/Audio/Player/death_boom.wav')
    this.load.audio(Sounds.CRASH, '../assets/Audio/Player/hit_boom.wav')
    this.load.audio(Sounds.ALIEN1A_HIT, '../assets/Audio/Aliens/alien1A_hit.wav')
    this.load.audio(Sounds.ALIEN1B_HIT, '../assets/Audio/Aliens/alien1B_hit.wav')
    this.load.audio(Sounds.ALIEN1C_HIT, '../assets/Audio/Aliens/alien1C_hit.wav')
    this.load.audio(Sounds.ALIEN1D_HIT, '../assets/Audio/Aliens/alien1D_hit.wav')
    this.load.audio(Sounds.ALIEN2A_HIT, '../assets/Audio/Aliens/alien2A_hit.wav')
    this.load.audio(Sounds.ALIEN2B_HIT, '../assets/Audio/Aliens/alien2B_hit.wav')
    this.load.audio(Sounds.ALIEN_DEATH, '../assets/Audio/Aliens/alien_death.wav')

    this.load.audio(Sounds.MUSIC, '../assets/Audio/Main Theme.mp3')
  }

  create() {
    const fullscreenButton = new FullscreenButton(this)
    this.scene.bringToTop()
    this.scene.launch(Scenes.MENU)
  }
}
