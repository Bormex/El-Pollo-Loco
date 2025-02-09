/**
 * Represents a throwable bottle that can be thrown and animated.
 * Extends the 'MovableObject' class and includes functionality for handling rotation 
 * animation and gravity during the throw.
 * 
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  IMAGES_BOTTLE_THROW = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  /**
   * Creates an instance of the throwable object.
   * @param {number} x - The x-coordinate of the throwable object on the canvas.
   * @param {number} y - The y-coordinate of the throwable object on the canvas.
   */
  constructor(x, y) {
    super().loadImage(
      'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png'
    );
    this.x = x;
    this.y = y;
    this.loadImages(this.IMAGES_BOTTLE_THROW);
    this.currentFrame = 0;
    this.throw();
    this.rotatingAnimation();
  }

  /**
   * Checks if the throwable object is colliding with another object.
   * @param {MovableObject} mo - The object to check for collision.
   * @returns {boolean} - 'true' if there is a collision, 'false' otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Simulates the throwing motion by applying gravity and moving the object horizontally.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }

  /**
   * Starts the animation by updating the bottle's rotating at intervals.
   */
  rotatingAnimation() {
    setInterval(() => {
      this.updateImage();
    }, 100);
  }

  /**
   * Updates the image for the rotating bottle animation.
   */
  updateImage() {
    this.currentImage = this.IMAGES_BOTTLE_THROW[this.currentFrame];
    this.img = this.imageCache[this.currentImage];
    this.currentFrame = (this.currentFrame + 1) % this.IMAGES_BOTTLE_THROW.length;
  }
}
