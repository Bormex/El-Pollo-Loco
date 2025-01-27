

class World {

    character = new Character();
    statusbar = new StatusBar();
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
    background_sound = new Audio('audio/small_chicken.mp3')

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.background_sound.play();
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
            this.checkBottleCoinCollisions();




        }, 200);






        
    }













    checkThrowObjects() {
        if (this.keyboard.KEYD && this.character.bottles > 0 && !this.movableobject.isDead()) {
            let bottle = new ThrowableObject(this.character.x + 75, this.character.y + 75);
            this.throwableobjects.push(bottle);
            this.character.bottles--;
            this.bottlebar.setPercentage(((this.bottlebar.percentage)-20));
        }
    }









    checkCoinCollisions() {
        this.level.coin.forEach((coin, i) => {
            if(this.character.isColliding(coin) && this.character.coin < 5) {
                //console.log(coin, i);
                this.character.collectCoins();
                this.coinbar.setPercentage((this.character.coin * 20));
                Level1.coin.splice(i, 1);
                this.coin_collect.play();
            }
        });
    }











    checkBottleCoinCollisions() {
        this.level.bottle.forEach((bottle, i) => {
            if(this.character.isColliding(bottle) && this.character.bottles < 5) {
                //console.log(bottle, i);
                this.character.collectBottles();
                this.bottlebar.setPercentage((this.character.bottles * 20));
                Level1.bottle.splice(i, 1);
                this.bottle_collect.play();
            }
        });
    }










    checkCollisions() {

        this.level.enemies.forEach((enemy) => {
            if(enemy.chickenIsDead) return;

            if(this.character.isColliding(enemy)) {
                this.handleCharacterEnemyCollision(enemy);
            }
        });
        this.checkThrowableCollisions();
    }



    checkThrowableCollisions() {
        this.throwableobjects.forEach((bottle, bottleIndex) => {
          this.level.enemies.forEach((enemy) => {
            if (bottle.isColliding(enemy)) {
              if (enemy instanceof Endboss) {
                enemy.hit();
                this.throwableobjects.splice(bottleIndex, 1);
               // this.bottle_sound.play();
                this.endbossstatusBar.setPercentage(enemy.energy);
              } else {
                this.handleBottleEnemyCollision(bottleIndex, enemy);
              }
            }
          });
        });
      }











    handleCharacterEnemyCollision(enemy) {
        if (enemy instanceof Endboss) {
          this.character.hit();
          this.statusbar.setPercentage(this.character.energy);
        } else {
          if (
            this.character.isColliding(enemy) &&
            this.character.isAboveGround() &&
            this.character.speedY < 0
          ) {
            //this.small_chicken_dead.play();
            enemy.changeToDeadImage();
            this.character.jump();
          } else {
            this.character.hit();
            this.statusbar.setPercentage(this.character.energy);
          }
        }
    }



















    handleBottleEnemyCollision(bottleIndex, enemy) {
       //this.bottle_sound.play();
        this.throwableObject.splice(bottleIndex, 1);
        if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
          enemy.changeToDeadImage();
          this.small_chicken_dead.play();
        }
        if (enemy instanceof Endboss) {
          enemy.playAnimation(enemy.IMAGES_HURT);
          this.chicken_dead_sound.play();
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
        })
    }











    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        })
    }










    addToMap(mo) {
        // spiegelt Pepe für links laufen
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
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