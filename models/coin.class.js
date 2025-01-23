

class Coin extends DrawableObject {

    y = 100;
    x = 500;
    percentage = 0;
    offset= {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
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