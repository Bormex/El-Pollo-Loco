

class Background extends MovableObject {

    width = 720;
    height = 400;

    constructor(ImagePath, x, y) {
        super().loadImage(ImagePath);
        this.x = x;
        this.y = y;
    }
}