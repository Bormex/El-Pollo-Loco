class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5; // Ist die Fallbeschleunigung
  energy = 100;
  lastHit = 0;
  bottles = 0;
  coin = 0;
  winnig_sound = new Audio('audio/game_win_sound.mp3');
  losing_sound = new Audio('audio/game_lose_sound.mp3');

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  applyGravity() {
    // Falling
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }

  hit() {
    this.energy -= 5;
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    if (this.isAboveGround()) {
      return false; // Unverwundbar, wenn über dem Boden
    }
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 125;
    }
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + mo.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  playAnimation(IMAGES) {
    let i = this.currentImage % IMAGES.length;
    let path = IMAGES[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }

  isDead() {
    return this.energy == 0;
  }

  collectCoins() {
    return (this.coin += 1);
  }

  collectBottles() {
    return (this.bottles += 1);
  }

  overlayWinOrLose() {
    if (this.energy == 0) {
      this.winnig_sound.play();
      world.character.y = 70; // winning Jump
      world.character.loadImage('img/2_character_pepe/3_jump/J-37.png'); // winning jump image
      document.getElementsByClassName('overlay-win')[0].style.display = 'unset';
      document.getElementsByClassName('navigation')[0].style.display = 'none';
    } else {
      this.losing_sound.play();
      document.getElementsByClassName('overlay-lose')[0].style.display =
        'unset';
      document.getElementsByClassName('navigation')[0].style.display = 'none';
    }
    this.stopDrawingIntervals();
  }

  stopDrawingIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }
}
