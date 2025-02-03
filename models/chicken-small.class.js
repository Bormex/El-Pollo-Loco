

class SmallChicken extends MovableObject {
  y = 360;
  height = 60;
  width = 60;
  chickenIsDead = false;

  offset= {
    top: 55,
    left: 10,
    right: 10,
    bottom: 55
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 500 + Math.random() * 1000;
    this.speed = 0.15 + Math.random() * 0.5;
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
    this.loadImage("img/3_enemies_chicken/chicken_small/2_dead/dead.png");
    this.chickenIsDead = true;
  }
}