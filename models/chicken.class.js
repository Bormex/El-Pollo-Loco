/**
 * The 'Chicken' class represents a small chicken enemy in the game. It extends the 'MovableObject' class and manages 
 * the chicken's movement, animations, and state (alive or dead).
 * 
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  height = 100;
  width = 85;
  y = 325;
  x = 800;
  chickenIsDead = false;

  offset = {
    top: 0,
    left: 10,
    right: 10,
    bottom: 0,
  };

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  /**
   * Creates an instance of the 'Chicken' class and initializes the chicken's image, movement, speed, and animations.
   */
  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.x = this.x + Math.random() * 1000;
    this.speed = this.speed + Math.random() * 0.25;
    this.animate();
  }

  /**
   * Starts the chicken's movement and animation. The chicken moves left and plays the walking animation.
   */
  animate() {
    setInterval(() => {
      if (!this.chickenIsDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.chickenIsDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }

  /**
   * Changes the chicken's state to dead and updates its image to reflect the dead state.
   * The chicken's position is adjusted after it dies.
   */
  changeToDeadImage() {
    this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
    this.chickenIsDead = true;
    this.y = 350;
  }
}
