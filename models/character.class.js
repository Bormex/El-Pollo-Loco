

class Character extends MovableObject {
    height = 300;
    width = 150;
    y = 125;
    speed = 10;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ]
    // Übergabe der ganzen variablen aus der World in character rein
    world;
    walking_sound = new Audio('audio/walking_on_rocks.mp3');



    constructor () {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');

        this.loadImages(this.IMAGES_WALKING); // läd die Bilder in 
        this.animate();
    }

    animate() {
        
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                // walk right
                this.walking_sound.play();
                this.otherDirection = false;
                this.x += this.speed;
                this.world.camera_x = -this.x + this.width;                
            }
        }, 1000 / 60)

        setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > 0) {
                // walk left
                this.walking_sound.play();
                this.otherDirection = true;
                this.x -= this.speed;
                this.world.camera_x = -this.x + this.width;
            }
        }, 1000 / 60)

        setInterval( () => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // walk animation
                this.playAnimation(this.IMAGES_WALKING)
            };
        }, 50);



    }

    jump() {

    }
}