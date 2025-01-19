

class World {

    character = new Character();
    statusbar = new StatusBar();
    level = Level1;
    keyboard;
    canvas;
    ctx;
    camera_x = 0;
    throwableobjects = []

    constructor(canvas, keyboard){
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
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.KEYD) {
            let bottle = new ThrowableObject(this.character.x + 75, this.character.y + 75);
            this.throwableobjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)) {
                if (this.character.energy > 0) {
                    this.character.hit();
                    this.statusbar.setPercentage(this.character.energy);
                }
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x, 0); // DAMIT DIE KAMERA MIT VOR LÄUFT 

        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableobjects);
        this.addToMap(this.character);
        
        // ------ TO FIX SIGN ON CHARACTER VIEW
        this.ctx.translate(-this.camera_x, 0); // DAMIT DIE KAMERA MIT ZURÜCK LÄUFT 
        this.addToMap(this.statusbar);
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