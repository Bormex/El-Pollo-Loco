

class World {

    character = new Character();
    statusbar = new StatusBar();
    level = Level1;
    keyboard;
    canvas;
    ctx;
    camera_x = 0;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    // Um diese kompl. Instants zuübergeben! => hauptsächlich gedacht für keyboard.
    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if( this.character.isColliding(enemy)) {
                    if (this.character.energy > 0) {
                        this.character.hit();
                    }
                }
            });
        }, 200);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addToMap(this.statusbar);
        this.ctx.translate(-this.camera_x, 0);

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