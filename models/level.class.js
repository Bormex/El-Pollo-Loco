class Level {
  enemies;
  clouds;
  backgrounds;
  bottle;
  coin;
  level_end_x = 2900;

  constructor(enemies, clouds, backgrounds, bottle, coin) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgrounds = backgrounds;
    this.bottle = bottle;
    this.coin = coin;
  }
}
