

class Background extends MovableObject {

    width = 720;
    height = 480;

    constructor(ImagePath, x, y) {
        super().loadImage(ImagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}