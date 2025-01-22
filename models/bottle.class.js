

class Bottle extends DrawableObject {
    
    width = 80;
    height = 100;

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

    constructor( x, y) {
        super().loadImage(this.IMAGES[1]);
        this.x = x;
        this.y = y;
    }


    //randomeImage() {
    //    return Math.random();
    //}
}