import { GameObjsNames, Sounds } from "../Utils/Enums"

class PowerUp extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setOrigin(0.5, 0.5);
    this.setVisible(true);
    this.setActive(true);
    this.setScale(0.3, 0.3);


    this.player = scene.player;

    this.value = null;
    this.name = "";  // powerup name showed on screen
    this.unitMeasure = "";  // powerup unit of measure showed on screen (if exist)
  }

  getPosition() {
    return [this.x, this.y];
  }

  pickUp() {
    return;
  }

  playSound() {
    this.scene.sound.play(Sounds.PUSOUND, {
      volume: 0.5
    });
  }
}


class HealthPU extends PowerUp {
  constructor(scene, x, y) {
    super(scene, x, y, GameObjsNames.HEALTH_PU);
    this.value = 20;
    this.name = "HEALTH";
    this.unitMeasure = "%";
  }

  pickUp() {
    this.player.increaseLife(this.value);
    this.playSound();
  }
}

class SpeedPU extends PowerUp {
  constructor(scene, x, y) {
    super(scene, x, y, GameObjsNames.SPEED_PU);
    this.value = 20;
    this.name = "SPEED";
    this.unitMeasure = "%";
  }

  pickUp() {
    this.player.increaseSpeed(this.value);
    this.playSound();
  }
}

class GunsPU extends PowerUp {
  constructor(scene, x, y) {
    super(scene, x, y, GameObjsNames.GUNS_PU);
    this.value = 1;
    this.name = "GUNS";
  }

  pickUp() {
    this.player.increaseGuns(this.value);
    this.playSound()
  }
}


class BulletRatePU extends PowerUp {
  constructor(scene, x, y) {
    super(scene, x, y, GameObjsNames.BULLETRATE_PU);
    this.value = 20;
    this.name = "BULLET RATE";
    this.unitMeasure = "%";
  }

  pickUp() {
    this.player.increaseBulletRate(this.value);
    this.playSound();
  }
}


class BulletPowerPU extends PowerUp {
  constructor(scene, x, y) {
    super(scene, x, y, GameObjsNames.BULLETPOWER_PU);
    this.value = 20;
    this.name = "BULLET POWER";
    this.unitMeasure = "%";
  }

  pickUp() {
    this.player.increaseBulletPower(this.value);
    this.playSound();
  }
}


class BulletVelocityPU extends PowerUp {
  constructor(scene, x, y) {
    super(scene, x, y, GameObjsNames.BULLETVELOCITY_PU);
    this.value = 20;
    this.name = "BULLET VELOCITY";
    this.unitMeasure = "%";
  }

  pickUp() {
    this.player.increaseBulletVelocity(this.value);
    this.playSound();
  }
}

class BulletBreakthroughPU extends PowerUp {
  constructor(scene, x, y) {
    super(scene, x, y, GameObjsNames.BULLETBREAKTHROUGH_PU);
    this.value = 1;
    this.name = "BULLET BREAKTHROUGH";
  }

  pickUp() {
    this.player.increaseBulletBreakthrough(this.value);
    this.playSound();
  }
}


const powerups_classes = [
  {
    cls: HealthPU,
    maxLevel: 5,
  },
  {
    cls: SpeedPU,
    maxLevel: 5,
  },
  {
    cls: GunsPU,
    maxLevel: 4,
  },
  {
    cls: BulletRatePU,
    maxLevel: 5,
  },
  {
    cls: BulletPowerPU,
    maxLevel: 5,
  },
  {
    cls: BulletVelocityPU,
    maxLevel: 6,
  },
  {
    cls: BulletBreakthroughPU,
    maxLevel: 5,
  }
]

export class PUCollection {
  constructor() {
    this.PU = this.getList();
  }

  getList() {
    let PU = []
    for (let powerup of powerups_classes) {
      for (let i = 0; i < powerup.maxLevel; i++) {
        PU.push(powerup.cls);
      }
    }
    return this.shuffle(PU);
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getRandomElement() {
    let randomIndex = Math.floor(Math.random() * this.PU.length);
    let randomPU = this.PU[randomIndex];
    this.PU.splice(randomIndex, 1);
    return randomPU;
  }
}