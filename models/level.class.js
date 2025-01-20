

class Level {
    enemies;
    clouds;
    backgrounds;
    statusbar;
    level_end_x = 2900;

    constructor(enemies, clouds, backgrounds, statusbar) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.statusbar = statusbar;
    }
}