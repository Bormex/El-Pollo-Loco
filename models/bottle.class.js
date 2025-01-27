

class Bottle extends DrawableObject {
    
    y = 340;
    width = 80;
    height = 100;
    percentage = 0;
    offset= {
        top: 15,
        left: 40,
        right: 40,
        bottom: 15
    };

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    constructor(x) {
        super().loadImage(this.IMAGES[this.randomeImage()]);
        this.x = x + Math.random() * 250;
        this.y = this.y;
    }


    randomeImage() {
        return Math.floor(Math.random() * this.IMAGES.length);
    }
    
}