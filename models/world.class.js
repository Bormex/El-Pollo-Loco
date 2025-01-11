

class World {

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [
        new Cloud()
    ];
    backgrounds = [
        new Background('img/5_background/layers/air.png', 0),
        new Background('img/5_background/layers/3_third_layer/1.png', 0),
        new Background('img/5_background/layers/2_second_layer/1.png', 0),
        new Background('img/5_background/layers/1_first_layer/1.png', 0),
    ];
   
    keyboard;
    canvas;
    ctx;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    // Um diese kompl. Instants zuübergeben! => hauptsächlich gedacht für keyboard.
    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.addObjectsToMap(this.backgrounds);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);


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
            this.ctx.save();
            this.ctx.translate(mo.img.width, 0);
            this.ctx.scale(-1, 1);
        }

        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)

        if (mo.otherDirection) {
            this.ctx.restore();
        }
    }
}