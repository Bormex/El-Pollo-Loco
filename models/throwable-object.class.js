class ThrowableObject extends MovableObject {
  IMAGES_BOTTLE_THROW = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  constructor(x, y) {
    super().loadImage(
      'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png'
    );
    this.x = x;
    this.y = y;

    this.rotationImages = [
      'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    this.loadImages(this.rotationImages);

    this.currentFrame = 0;
    this.throw();
    this.startAnimation();
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
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
