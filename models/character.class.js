/**
 * The 'Character' class represents the main character in the game. It extends from the 'MovableObject' class and manages
 * 
 * @extends MovableObject
 */
class Character extends MovableObject {
  height = 300;
  width = 150;
  y = 135;
  speed = 10;
  timeoutActive = false;
  longIdleActive = false;
  idleActive = false;
  shortIdle = null;
  longIdle = null;
  shortInter = null;
  longerInter = null;
  countJumpFrames = 0;
  offset = {
    top: 90,
    bottom: 0,
    left: 30,
    right: 30,
  };
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  world;
  walking_sound = new Audio("audio/walking_on_rocks.mp3");
  yawing_sound = new Audio("audio/yawing.mp3");
  snoring_sound = new Audio("audio/snoring.mp3");

  /**
   * Creates an instance of the 'Character' class and initializes animations, gravity, and movement.
   * Loads images for walking, idle, jumping, hurt, and dead animations.
   * Starts the animation and handles movement based on keyboard inputs.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }

  /**
   * Starts the animation and handles character movement based on keyboard input.
   * This includes walking, jumping, idle, and death animations.
   */
  animate() {
    setInterval(() => {
      this.allowMoveLeft();
      this.allowMoveRight();
      this.allowJump();
      this.world.camera_x = -this.x + this.width;
    }, 1000 / 60);

    setInterval(() => {
      if (
        this.isAboveGround() &&
        this.countJumpFrames <= this.IMAGES_JUMPING.length
      ) {
        this.playJumpAnimation();
      }
    }, 150);

    setInterval(() => {
      if (this.isDead()) this.playAnimation(this.IMAGES_DEAD);
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else {
        this.playWalkingAnimation();
      }
      let userInput = this.checkUserInput();
      if (userInput && !this.timeoutActive && !this.longIdleActive)
        this.playShortIdle();
      if (!userInput) this.resetIdle();
      this.resetPepeOnGround();
    }, 50);
  }

  /**
   * Allows the character to jump if the UP key is pressed and the character is on the ground and not dead.
   */
  allowJump() {
    if (
      this.world.keyboard.UP &&
      !this.isAboveGround() &&
      !this.isDead() &&
      world.endbossstatusBar.percentage > 0
    ) {
      this.jump();
      this.countJumpFrames = 0;
    }
  }

  /**
   * Moves the character left if the LEFT key is pressed and the character is not at the left boundary.
   * Plays walking sound if the character is on the ground and sound is enabled.
   */
  allowMoveLeft() {
    if (
      this.world.keyboard.LEFT &&
      this.x > 0 &&
      !this.isDead() &&
      world.endbossstatusBar.percentage > 0
    ) {
      this.moveLeft();
      this.otherDirection = true;
      if (!this.isAboveGround() && !this.world.sound) this.walking_sound.play();
    }
  }

  /**
   * Moves the character right if the RIGHT key is pressed and the character is not at the right boundary.
   * Plays walking sound if the character is on the ground and sound is enabled.
   */
  allowMoveRight() {
    if (
      this.world.keyboard.RIGHT &&
      this.x < this.world.level.level_end_x &&
      !this.isDead() &&
      world.endbossstatusBar.percentage > 0
    ) {
      this.moveRight();
      this.otherDirection = false;
      if (!this.isAboveGround() && !this.world.sound) this.walking_sound.play();
    }
  }

  /**
   * Checks if the user is not pressing any movement keys and the character is not hurt.
   * @returns {boolean} True if no movement keys are pressed and the character is not hurt, otherwise false.
   */
  checkUserInput() {
    return (
      !this.world.character.isHurt() &&
      !this.world.keyboard.RIGHT &&
      !this.world.keyboard.LEFT &&
      !this.world.keyboard.UP
    );
  }

  /**
   * Initiates a short idle animation after 10 seconds of inactivity.
   * Plays yawning sound if sound is enabled and triggers long idle animation.
   */
  playShortIdle() {
    this.timeoutActive = true;
    this.shortIdle = setTimeout(() => {
      this.idleActive = true;
      this.shortInter = setInterval(() => {
        this.playAnimation(this.IMAGES_IDLE);
      }, 1000 / 2);
      if (!world.sound) this.yawing_sound.play();
      this.timeoutActive = false;
      this.longIdleActive = true;
      this.playLongIdle();
    }, 1000);
  }

  /**
   * Initiates a long idle animation after 20 seconds of inactivity.
   * Plays snoring sound if sound is enabled.
   */
  playLongIdle() {
    this.timeoutActive = true;
    this.longIdle = setTimeout(() => {
      clearInterval(this.shortInter);
      this.longInter = setInterval(() => {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        if (!world.sound) this.snoring_sound.play();
      }, 1000 / 2);
      this.timeoutActive = false;
      this.longIdleActive = true;
    }, 12500);
  }

  /**
   * Resets all idle animations and sounds, stopping any active timeouts or intervals.
   */
  resetIdle() {
    this.timeoutActive = false;
    this.longIdleActive = false;
    this.idleActive = false;
    clearInterval(this.shortInter);
    clearInterval(this.longInter);
    clearTimeout(this.longIdle);
    clearTimeout(this.shortIdle);
    this.snoring_sound.pause();
    this.snoring_sound.currentTime = 0;
    this.yawing_sound.pause();
    this.yawing_sound.currentTime = 0;
  }

  /**
   * Plays the jump animation by cycling through the jumping images.
   * Increments the jump frame counter and updates the current image index.
   */
  playJumpAnimation() {
    this.playAnimation(this.IMAGES_JUMPING);
    this.countJumpFrames += 1;
    this.currentImage = this.countJumpFrames;
  }

  /**
   * Resets the character's sprite to the idle image when on the ground 
   * and not moving, idling, or dead.
   */
  resetPepeOnGround() {
    if (
      !this.isAboveGround() &&
      !this.world.keyboard.RIGHT &&
      !this.world.keyboard.LEFT &&
      !this.idleActive &&
      !this.isDead()
    )
      this.loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
  }

  /**
   * Plays the walking animation when the character is moving left or right,
   * when he is on the ground, the final boss is still alive, and the character is not dead.
   */
  playWalkingAnimation() {
    if (
      (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
      !this.isAboveGround() &&
      world.endbossstatusBar.percentage > 0 &&
      !this.isDead()
    )
      this.playAnimation(this.IMAGES_WALKING);
  }
}
