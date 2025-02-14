/**
 * The 'Endboss' class represents the finals boss and It extends the 'MovableObject' class.
 * 
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  height = 400;
  width = 300;
  y = 60;
  speed = 1.5;
  x = 2900;
  endboss_dead = false;
  isHurt = false;
  chickenIsDead = false;

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

  /**
   * Initializes the final boss, loads all relevant images and status bars.
   * Starts animations and movements of the final boss.
   */
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

  /**
   * Periodically checks if the boss or the character is dead and ends the game if true.
   */
  endingGame() {
    setInterval(() => {
      if (this.energy == 0 || world.character.energy == 0) {
        this.overlayWinOrLose();
        world.background_sound.pause();
        this.endboss_dead = true;        
      }
    }, 200);
  }

  /**
   * Controls the animations for the final boss based on its state (dead, hurt, walking, attacking).
   */
  animate() {
    setInterval(() => {
      if (this.isDead()) {
        this.chickenIsDead = true;
        this.playAnimation(this.IMAGES_DEAD);
      }
      if (this.isHurt && !this.isDead()) {
        this.playAnimation(this.IMAGES_HURT);
      }      
    }, 1000 / 10);
  }

  /**
   * Moves the final boss based on the position of the character.
   * If the character gets too close, the boss switches to attack mode.
   */
  movement() {
    this.endbossMovementInterval = setInterval(() => {
      if (!this.isDead()) {
        const distance = this.x - world.character.x;
        this.bossAttackPattern(distance);
      }
    }, 1000 / 10);
  }

  /**
   * Damages the final boss and triggers the hurt animation.
   * If the final boss runs out of energy, it is marked as dead.
   */
  hit() {
    this.reduceEnergy(25);
    if (!this.energy <= 0) {
      this.checkIfhit();
    }
  }

  /**
   * Reduces the final boss's energy by a specified amount.
   * Ensures the energy doesn't fall below zero.
   * 
   * @param {number} amount The amount by which to reduce the energy.
   */
  reduceEnergy(amount) {
    this.energy -= amount;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  /**
   * Marks the final boss as hurt and updates the status bar.
   */
  checkIfhit() {
    this.lastHit = new Date().getTime();
    this.isHurt = true;
      setTimeout(() => {
        this.isHurt = false;
      }, 200)
    this.statusBar.setPercentage(this.energy);
  }
 
  /**
   * Moves the boss forward by move left.
   * Plays the walking animation and sets the movement speed to 15.
   */
  goForward() {
    this.moveLeft();
    this.playAnimation(this.IMAGES_WALKING);
    this.speed = 15;
  }

  /**
   * Moves the boss forward by move left
   * and play the attack animation.
   */
  goAttack() {
    this.moveLeft();
    this.playAnimation(this.IMAGES_ATTACK);
  }

  /**
   * Increases the boss's speed shortly when it gets hit.
   */
  speedUpIfhit() {
    this.speed = 25;
  }

  /**
   * Determines the attack pattern of the boss based on its distance from the character.
   * - If the character is within a certain range, the boss moves forward.
   * - If the character is even closer, the boss switches to attack mode.
   * - If the boss is hurt, it speeds up.
   * - Otherwise, it moves slowly.
   *
   * @param {number} distance - The distance between the boss and the character.
   */
  bossAttackPattern(distance) {
    if (distance < 600 && distance > 450 && !this.isHurt) {
      this.goForward();
    } else if (distance <= 450 && !this.isHurt) {
      this.goAttack();
    } else if (this.isHurt) {
      this.speedUpIfhit();
    } else {
      this.speed = 1.5;
    }
  }
}

