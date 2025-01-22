

class Level {
    enemies;
    clouds;
    backgrounds;
    bottle;
    level_end_x = 2900;

    constructor(enemies, clouds, backgrounds, bottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.bottle = bottle;
    }
}