

class Bottle extends DrawableObject {
    
    y = 340;
    x = 500;
    width = 80;
    height = 100;
    percentage = 0;
    offset= {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    constructor() {
        super().loadImage(this.IMAGES[this.randomeImage()]);
        this.x = this.x + Math.random() * 1000;
        this.y = this.y;
    }


    randomeImage() {
        return Math.floor(Math.random() * this.IMAGES.length);
    }
    
}