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
  shortIdle = null;
  longIdle = null;

  offset = {
    top: 95,
    bottom: 0,
    left: 50,
    right: 50,
  };
  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png',
  ];
  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png',
  ];
  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];
  IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png',
  ];
  IMAGES_LONG_IDLE = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];
  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ];
  // Übergabe der ganzen variablen aus der World in character rein
  world;
  walking_sound = new Audio('audio/walking_on_rocks.mp3');
  yawing_sound = new Audio('audio/yawing.mp3');
  snoring_sound = new Audio('audio/snoring.mp3');

  /**
   * Creates an instance of the 'Character' class and initializes animations, gravity, and movement.
   * Loads images for walking, idle, jumping, hurt, and dead animations.
   * Starts the animation and handles movement based on keyboard inputs.
   */
  constructor() {
    super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
    this.loadImages(this.IMAGES_WALKING); // läd die Bilder in imageCache in Moveable-Objects OHNE WIRD KEIN BILD AUSGEBEN!
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
      if (
        this.world.keyboard.RIGHT &&
        this.x < this.world.level.level_end_x &&
        !this.isDead()
      ) {
        // move right
        this.moveRight();
        this.otherDirection = false;
        if (!this.isAboveGround() && !this.world.sound)
          this.walking_sound.play();
      }
      if (this.world.keyboard.LEFT && this.x > 0 && !this.isDead()) {
        // move left
        this.moveLeft();
        this.otherDirection = true;
        if (!this.isAboveGround() && !this.world.sound)
          this.walking_sound.play();
      }
      //position von pepe am boden (bzw. wenn er nicht am boden ist!!)
      if (this.world.keyboard.UP && !this.isAboveGround() && !this.isDead()) {
        // Jumping
        this.jump();
      }

      this.world.camera_x = -this.x + this.width;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) this.playAnimation(this.IMAGES_WALKING);
      }
      let userInput = this.checkUserInput();
      if (userInput && !this.timeoutActive && !this.longIdleActive) this.playShortIdle();
      if (userInput && !this.timeoutActive && this.longIdleActive) this.playLongIdle();
      if (!userInput) this.resetIdle(); 
    }, 50);
  }

  checkUserInput() {
    return !this.world.character.isHurt() &&
    !this.world.keyboard.RIGHT &&
    !this.world.keyboard.LEFT &&
    !this.world.keyboard.UP
  }

  playShortIdle() {
    this.timeoutActive = true;
      this.shortIdle = setTimeout(() => {
      this.playAnimation(this.IMAGES_IDLE);
      if (!world.sound) this.yawing_sound.play();
      this.timeoutActive = false;
      this.longIdleActive = true;
    }, 10000)
  }

  playLongIdle() {
    this.timeoutActive = true;
      this.longIdle = setTimeout(() => {
      this.playAnimation(this.IMAGES_LONG_IDLE);
      if (!world.sound) this.snoring_sound.play();
      this.timeoutActive = false;
      this.longIdleActive = true;
    }, 10000)
  }

  resetIdle() {
    this.timeoutActive = false;
    this.longIdleActive = false;
    clearTimeout(this.longIdle);
    clearTimeout(this.shortIdle);
    this.snoring_sound.pause();
    this.snoring_sound.currentTime = 0;
    this.yawing_sound.pause();
    this.yawing_sound.currentTime = 0;
  }
}
