

class DrawableObject {
    x = 120;
    y = 280;
    width = 100;
    height = 150;
    img;
    imageCache = {};
    currentImage = 0;


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if(this.percentage >= 80) {
            return 4;
        } else if(this.percentage >= 60) {
            return 3;
        } else if(this.percentage >= 40) {
            return 2;
        } else if(this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }; 

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    };

    // für die Images das sie gemalt werden
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    };

    // für die Ränder
    drawFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
        if(this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.offset.top, this.offset.bottom, this.offset.left, this.offset.right);
            ctx.stroke();
        }
    };
   
}