class Endboss extends MovableObject {
  height = 400;
  width = 300;
  y = 60;
  speed = 1.5;
  x = 2900;
  endboss_dead = false;
  isHurt = false;

  offset = {
    top: 55,
    left: 35,
    right: 35,
    bottom: 55,
  };

  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ];

  IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
  ];

  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];

  IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ];

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ATTACK);
    this.statusBar = new Endbossbar();
    this.animate();
    this.movement();
    this.endingGame();
  }

  endingGame() {
    setInterval(() => {
      if (this.energy == 0 || world.character.energy == 0) {
        this.overlayWinOrLose();
        world.background_sound.pause();
      }
    }, 200);
  }

  animate() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        if (this.isHurt && !this.isDead()) {
          this.playAnimation(this.IMAGES_HURT);
        }
      }
    }, 1000 / 10);
  }

  movement() {
    this.endbossMovementInterval = setInterval(() => {
      if (!this.isDead()) {
        const distance = this.x - world.character.x;
        if (distance < 600 && distance > 450) {
          this.moveLeft();
          this.playAnimation(this.IMAGES_WALKING);
        } else if (distance <= 450) {
          this.moveLeft();
          this.speed = 15;
          this.playAnimation(this.IMAGES_ATTACK);
        } else {
          this.speed = 1.5;
        }
      }
    }, 1000 / 10);
  }

  hit() {
    this.reduceEnergy(25);
    this.playAnimation(this.IMAGES_HURT);

    if (this.energy <= 0) {
      this.checkIfdead();
    } else {
      this.checkIfhit();
    }
  }

  reduceEnergy(amount) {
    this.energy -= amount;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  checkIfdead() {
    this.endboss_dead = true;
    this.playAnimation(this.IMAGES_DEAD);
  }

  checkIfhit() {
    this.lastHit = new Date().getTime();
    this.isHurt = true;
    this.statusBar.setPercentage(this.energy);
  }
}
