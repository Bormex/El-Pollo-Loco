

class Cloud extends MovableObject {
    y = 40;

    constructor(ImagePath, width, height, x, y) {
        super().loadImage(ImagePath);
        this.width = width;
        this.height = height;
        this.x = x;
        this.speed = this.speed + Math.random() * 0.05;
        this.y = this.y - Math.random() * 50;
        this.animate();
        
    }



    animate() {

        setInterval(() => {
            this.moveLeft()
        }, 1000 / 60);

    
    };

    
}