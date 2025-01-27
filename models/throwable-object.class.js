

class ThrowableObject extends MovableObject {

    

    IMAGES_BOTTLE_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        
        this.rotationImages = [
            "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
            "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
            "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
            "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
        ];
        
        this.loadImages(this.rotationImages);
        
        this.currentFrame = 0;
        this.throw();
        this.startAnimation();
    }

    isColliding(mo) {
        return (
          this.x + this.width > mo.x &&
          this.x < mo.x + mo.width &&
          this.y + this.height > mo.y &&
          this.y < mo.y + mo.height
        );
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    startAnimation() {
        setInterval(() => {
          this.updateImage();
        }, 100);
    }
    
      
    updateImage() {
      this.currentImage = this.rotationImages[this.currentFrame];
      this.img = this.imageCache[this.currentImage];
      this.currentFrame = (this.currentFrame + 1) % this.rotationImages.length;
    }
}