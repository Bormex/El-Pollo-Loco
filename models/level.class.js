/**
 * Represents a level in the game.
 */
class Level {
  enemies;
  clouds;
  backgrounds;
  bottle;
  coin;
  level_end_x = 2900;

  /**
   * Creates a new level with specified enemies, clouds, backgrounds, bottle, and coin.
   * 
   * @param {Array<MovableObject>} enemies - The enemies in the level.
   * @param {Array<Cloud>} clouds - The clouds in the level.
   * @param {Array<DrawableObject>} backgrounds - The backgrounds in the level.
   * @param {Bottle} bottle - The bottle item in the level.
   * @param {Coin} coin - The coin item in the level.
   */
  constructor(enemies, clouds, backgrounds, bottle, coin) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgrounds = backgrounds;
    this.bottle = bottle;
    this.coin = coin;
  }
}
