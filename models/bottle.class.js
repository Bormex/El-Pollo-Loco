/**
 * The 'Bottle' class represents a bottle object in the game.
 * 
 * @extends DrawableObject
 */
class Bottle extends DrawableObject {
  y = 340;
  width = 80;
  height = 100;
  percentage = 0;
  offset = {
    top: 15,
    left: 30,
    right: 10,
    bottom: 15,
  };

  IMAGES = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
  ];

  /**
   * Creates an instance of the 'Bottle' class.
   * Randomly selects an image for the bottle and sets its 'x' position with a random offset.
   *
   * @param {number} x - The x-coordinate for the bottle's initial position.
   */
  constructor(x) {
    super().loadImage(this.IMAGES[this.randomeImage()]);
    this.x = x + Math.random() * 250;
    this.y = this.y;
  }

  /**
   * Returns a randome number '1' or '2' to print a randome Image of Salsa Bottles. 
   * 
   * @returns {number} - returns randome 1 or 2  
   */
  randomeImage() {
    return Math.floor(Math.random() * this.IMAGES.length);
  }
}
