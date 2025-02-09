/**
 * The 'Coin' class represents a collectible coin in the game.
 * 
 * @extends DrawableObject
 */
class Coin extends DrawableObject {
  y = 100;
  x = 500;
  percentage = 0;
  offset = {
    top: 55,
    left: 35,
    right: 35,
    bottom: 55,
  };
  IMAGES = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];

  /**
   * Creates an instance of the 'Coin' class.
   * Randomly selects an image and x-coordinate for the coin.
   */
  constructor() {
    super().loadImage(this.IMAGES[this.randomeImage()]);
    this.x = this.x + Math.random() * 1000;
    this.y = this.y;
  }

   /**
   * Selects a random index from the 'IMAGES' array to choose an image for the coin.
   * 
   * @returns {number} - A random index from the IMAGES array.
   */
  randomeImage() {
    return Math.floor(Math.random() * this.IMAGES.length);
  }
}
