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

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  // Um diese kompl. Instants zuübergeben! => hauptsächlich gedacht für keyboard.
  setWorld() {
    this.character.world = this;
  }

  // läuft 24/7 durch
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkCoinCollisions();
      this.checkBottleCollisions();
      this.backgroundMusic();
    }, 200);
  }

  backgroundMusic() {
    !this.sound ? this.background_sound.play() : this.background_sound.pause();
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.chickenIsDead) return; // damit totes huhn kein dmg gibt

      if (this.character.isColliding(enemy)) {
        this.checkCharacterEnemyCollision(enemy);
      }
    });
    this.checkThrowableCollisions();
  }

  // wirf flaschen
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

  addObjectsToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo); // spiegelt Pepe für links laufen
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    mo.drawOffsetFrame(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo); // spiegelt Pepe für rechts laufen
  }

  flipImage(mo) {
    // um Pepe zu spiegeln
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    // um das canvas zu spiegeln
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    // um das canvas zu spiegeln
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
