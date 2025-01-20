

class Chicken extends MovableObject {
    height = 100;
    width = 85;
    y = 325;
    x = 800;
    offset= {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]



    constructor () {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = this.x + Math.random() * 1000;
        this.speed = this.speed + Math.random() * 0.25;
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.moveLeft()
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 500);
    }


}