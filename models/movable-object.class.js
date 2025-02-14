/**
 * Represents a movable object in the game. This class extends from 'DrawableObject' and 
 * provides functionality for movement, gravity, collision detection, and other actions.
 * 
 * @extends DrawableObject
 */
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

  /**
   * Applies gravity to the object, causing it to fall when it's above the ground.
   */
  applyGravity() {
    // Falling
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }
  /**
   * Reduces the object's energy when it takes damage.
   */
  hit() {
    this.energy -= 5;
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Determines if the object is currently hurt based on the time since it was last hit.
   * If the object is above the ground, it is not considered hurt.
   * 
   * @returns {boolean} - Whether the object is hurt.
   */
  isHurt() {
    if (this.isAboveGround()) {
      return false; // Unverwundbar, wenn über dem Boden
    }
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Determines if the object is above the ground.
   * 
   * @returns {boolean} - Whether the object is above the ground.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 135;
    }
  }

  /**
   * Checks for collision between this object and another 'MovableObject'.
   * 
   * @param {MovableObject} mo - The other movable object to check for collision.
   * @returns {boolean} - Whether a collision is detected.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + mo.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Plays an animation by cycling through a list of image paths.
   * @param {string[]} IMAGES - An array of image paths for the animation.
   */
  playAnimation(IMAGES) {
    let i = this.currentImage % IMAGES.length;
    let path = IMAGES[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting its vertical speed.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Determines if the object is dead.
   * @returns {boolean} - Whether the object is dead.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Increases the coin count by 1.
   * @returns {number} - The new coin count.
   */
  collectCoins() {
    return (this.coin += 1);
  }

  /**
   * Increases the bottle count by 1.
   * @returns {number} - The new bottle count.
   */
  collectBottles() {
    return (this.bottles += 1);
  }

  /**
   * Displays the win or lose overlay and plays the corresponding sound.
   * Stops all drawing intervals when the game ends.
   */
  overlayWinOrLose() {
    if (this.energy == 0) {
      if (!world.sound) this.winnig_sound.play();
      //world.character.y = 70; // winning Jump
      //world.character.loadImage('img/2_character_pepe/3_jump/J-37.png'); // winning jump image
      document.getElementsByClassName('overlay-win')[0].style.display = 'unset';
      document.getElementsByClassName('navigation')[0].style.display = 'none';
    } else {
      if (!world.sound) this.losing_sound.play();
      document.getElementsByClassName('overlay-lose')[0].style.display = 'unset';
      document.getElementsByClassName('navigation')[0].style.display = 'none';
    }
    setTimeout(() => {
      this.stopDrawingIntervals();
    }, 1000)
  }

  /**
   * Stops all drawing intervals in the game to halt any ongoing animations.
   */
  stopDrawingIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }
}
