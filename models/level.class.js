

class Level {
    enemies;
    clouds;
    backgrounds;
    level_end_x = 2900;

    constructor(enemies, clouds, backgrounds) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
    }
}