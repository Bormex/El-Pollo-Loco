/**
 * Represents the game world, including the character, enemies, status bars, and other game objects.
 */
class World {
  character = new Character();
  statusbar = new StatusBar();
  endboss = new Endboss();
  coinbar = new Coinbar();
  bottlebar = new Bottlebar();
  endbossstatusBar = new Endbossbar();
  level = Level1;
  movableobject = new MovableObject();
  keyboard;
  canvas;
  ctx;
  camera_x = 0;
  throwableobjects = [];
  coin_collect = new Audio('audio/coin_collect.mp3');
  bottle_collect = new Audio('audio/bottle_collect.mp3');
  background_sound = new Audio('audio/game_sound.mp3');
  bottle_drop = new Audio('audio/broken_bottle.mp3');
  chicken_hit = new Audio('audio/chicken_dead.mp3');
  boss_chicken_hit = new Audio('audio/boss_chicken_dead.mp3');
  character_hit_sound = new Audio('audio/character_sound1.mp3');
  sound = false;

  /**
   * Creates an instance of the game world.
   * @param {HTMLCanvasElement} canvas - The canvas element where the game will be drawn.
   * @param {Keyboard} keyboard - The keyboard object to handle user input.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Sets the world for the character, mainly to provide access to the 'World' object from the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Runs the main game loop, checking collisions and other game logic every 200ms.
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkCoinCollisions();
      this.checkBottleCollisions();
      this.backgroundMusic();
    }, 200);
  }

  /**
   * Toggles the background music on or off based on the current sound state.
   */
  backgroundMusic() {
    !this.sound ? this.background_sound.play() : this.background_sound.pause();
  }

  /**
   * Checks for collisions between the character and enemies, and between throwable objects and enemies.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.chickenIsDead) return; // damit totes huhn kein dmg gibt

      if (this.character.isColliding(enemy)) {
        this.checkCharacterEnemyCollision(enemy);
      }
    });
    this.checkThrowableCollisions();
  }

  /**
   * Handles throwing of bottles when the player presses the 'D' key.
   */
  checkThrowObjects() {
    if (
      this.keyboard.KEYD &&
      this.character.bottles > 0 &&
      !this.movableobject.isDead()
    ) {
      let bottle = new ThrowableObject(
        this.character.x + 75,
        this.character.y + 75
      );
      this.throwableobjects.push(bottle);
      this.character.bottles--;
      this.bottlebar.setPercentage(this.bottlebar.percentage - 20);
    }
  }

  /**
   * Checks for collisions between the character and coins. If a collision is detected,
   * the character collects the coin and the coin disappears from the level.
   */
  checkCoinCollisions() {
    this.level.coin.forEach((coin, i) => {
      if (this.character.isColliding(coin) && this.character.coin < 5) {
        this.character.collectCoins();
        this.coinbar.setPercentage(this.character.coin * 20);
        Level1.coin.splice(i, 1);
        if (!this.sound) this.coin_collect.play();
      }
    });
  }

  /**
   * Checks for collisions between the character and bottles. If a collision is detected,
   * the character collects the bottle and the bottle disappears from the level.
   */
  checkBottleCollisions() {
    this.level.bottle.forEach((bottle, i) => {
      if (this.character.isColliding(bottle) && this.character.bottles < 5) {
        this.character.collectBottles();
        this.bottlebar.setPercentage(this.character.bottles * 20);
        Level1.bottle.splice(i, 1);
        if (!this.sound) this.bottle_collect.play();
      }
    });
  }

  /**
   * Checks for collisions between throwable objects (bottles) and enemies.
   * If a bottle hits an enemy, the appropriate action is taken based on the type of enemy.
   */
  checkThrowableCollisions() {
    this.throwableobjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          if (enemy instanceof Endboss) {
            enemy.hit();
            this.throwableobjects.splice(bottleIndex, 1);
            if (!this.sound) this.bottle_drop.play();
            this.endbossstatusBar.setPercentage(enemy.energy);
            if (!this.sound) this.boss_chicken_hit.play();
          } else {
            this.checkBottleEnemyCollision(bottleIndex, enemy);
          }
        }
      });
    });
  }

  /**
   * Handles the collision between the character and an enemy.
   * If the character collides with an Endboss or other enemy, the appropriate action is taken.
   * 
   * @param {MovableObject} enemy - The enemy object the character collided with.
   */
  checkCharacterEnemyCollision(enemy) {
    if (enemy instanceof Endboss) {
      if (!this.sound) this.character_hit_sound.play();
      this.character.hit();
      this.statusbar.setPercentage(this.character.energy);
    } else {
      if (
        this.character.isColliding(enemy) &&
        this.character.isAboveGround() &&
        this.character.speedY < 0
      ) {
        if (!this.sound) this.chicken_hit.play();
        enemy.changeToDeadImage();
        this.character.jump();
      } else {
        if (!this.sound) this.character_hit_sound.play();
        this.character.hit();
        this.statusbar.setPercentage(this.character.energy);
      }
    }
  }

  /**
   * Handles the collision between a throwable bottle and an enemy.
   * If a collision occurs, the enemy is either killed or hurt based on its type.
   * 
   * @param {number} bottleIndex - The index of the bottle in the throwable objects array.
   * @param {MovableObject} enemy - The enemy object the bottle collided with.
   */
  checkBottleEnemyCollision(bottleIndex, enemy) {
    if (!this.sound) this.bottle_drop.play();
    this.throwableobjects.splice(bottleIndex, 1);
    if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
      enemy.changeToDeadImage();
      if (!this.sound) this.chicken_hit.play();
    }
    if (enemy instanceof Endboss) {
      enemy.playAnimation(enemy.IMAGES_HURT);
      if (!this.sound) this.boss_chicken_hit.play();
    }
  }

  /**
   * Draws the game objects to the canvas, including the character, enemies, status bars, and other objects.
   * Calls itself recursively using 'requestAnimationFrame' to create a continuous animation loop.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0); // DAMIT DIE KAMERA MIT VOR LÄUFT

    this.addObjectsToMap(this.level.backgrounds);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottle);
    this.addObjectsToMap(this.level.coin);
    this.addObjectsToMap(this.throwableobjects);
    this.addToMap(this.character);

    // ------ TO FIX SIGN ON CHARACTER VIEW
    this.ctx.translate(-this.camera_x, 0); // DAMIT DIE KAMERA MIT ZURÜCK LÄUFT
    this.addToMap(this.statusbar);
    this.addToMap(this.coinbar);
    this.addToMap(this.bottlebar);
    this.addToMap(this.endbossstatusBar);
    this.ctx.translate(this.camera_x, 0); // DAMIT DIE KAMERA MIT VOR LÄUFT
    // ------ TO FIX SIGN ON CHARACTER VIEW

    this.ctx.translate(-this.camera_x, 0); // DAMIT DIE KAMERA MIT ZURÜCK LÄUFT

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds a list of objects to the canvas, calling the 'addToMap' method for each object.
   * 
   * @param {DrawableObject[]} objects - An array of drawable objects to be added to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  /**
   * Adds a single object to the canvas, drawing it and its frame with the necessary transformations.
   * 
   * @param {DrawableObject} mo - The drawable object to be added to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo); // spiegelt Pepe für links laufen
    mo.draw(this.ctx);
    //mo.drawFrame(this.ctx);
    //mo.drawOffsetFrame(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo); // spiegelt Pepe für rechts laufen
  }

  /**
   * Flips the image horizontally for a given object.
   * 
   * @param {DrawableObject} mo - The object whose image will be flipped.
   */
  flipImage(mo) {
    // um Pepe zu spiegeln
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    // um das canvas zu spiegeln
    mo.x = mo.x * -1;
  }

  /**
   * Restores the flipped image back to its original orientation for a given object.
   * 
   * @param {DrawableObject} mo - The object whose image will be restored.
   */
  flipImageBack(mo) {
    // um das canvas zu spiegeln
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
