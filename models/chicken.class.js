

class Chicken extends MovableObject {
    height = 100;
    width = 85;
    y = 325;
    x = 800;
    chickenIsDead = false;
    walking_sound = new Audio('audio/big_chicken.mp3');
    offset = {
        top: 15,
        left: 10,
        right: 10,
        bottom: 10
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor () {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = this.x + Math.random() * 1000;
        this.speed = this.speed + Math.random() * 0.25;
        this.animate();
    }

    animate() {

        setInterval(() => {
            if (!this.chickenIsDead) {
              this.moveLeft();
            }
          }, 1000 / 60);
      
          setInterval(() => {
            if (!this.chickenIsDead) {
              this.playAnimation(this.IMAGES_WALKING);
            }
          }, 200);
    }

    changeToDeadImage() {
        this.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
        this.chickenIsDead = true;
        this.y = 350;
    }

}