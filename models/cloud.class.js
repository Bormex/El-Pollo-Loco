/**
 * The 'Cloud' class represents a cloud in the game that moves horizontally across the screen.
 * 
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  y = 40;

  /**
   * Creates an instance of the 'Cloud' class with a specified image, size, position, and random vertical offset.
   * The cloud's speed is also set to a random value for more natural movement.
   * 
   * @param {string} ImagePath - The path to the cloud image.
   * @param {number} width - The width of the cloud.
   * @param {number} height - The height of the cloud.
   * @param {number} x - The x-coordinate of the cloud.
   * @param {number} y - The y-coordinate of the cloud (adjusted with a random vertical offset).
   */
  constructor(ImagePath, width, height, x, y) {
    super().loadImage(ImagePath);
    this.width = width;
    this.height = height;
    this.x = x;
    this.speed = this.speed + Math.random() * 0.05;
    this.y = this.y - Math.random() * 50;
    this.animate();
  }

  /**
   * Moves the cloud to the left at the cloud's current speed.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
