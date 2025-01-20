

class Level {
    enemies;
    clouds;
    backgrounds;
    level_end_x = 2900;

    constructor(enemies, clouds, backgrounds, statusbar) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
    }
}