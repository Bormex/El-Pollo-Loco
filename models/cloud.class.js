

class Cloud extends MovableObject {
    y = 50;
    width = 500;
    height = 250;
    x = 600;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        
        this.animate();
        
    }


    animate() {
        this.moveLeft();
    };

    
}