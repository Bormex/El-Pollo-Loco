/**
 * The 'Background' class represents a movable background element in the game.
 * 
 * @extends MovableObject
 */
class Background extends MovableObject {
  width = 720;
  height = 480;

   /**
   * Creates an instance of the 'Background' class.
   * Loads an image and sets the position of the background.
   *
   * @param {string} ImagePath - The path to the image file to be used for the background.
   * @param {number} x - The x-coordinate for the background's position.
   * @param {number} y - The y-coordinate for the background's position. Default is calculated to align with the bottom.
   */
  constructor(ImagePath, x, y) {
    super().loadImage(ImagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
