

class sky extends MovableObject {

    width = 720;
    height = 400;
    x = 0;
    y = 0;

    
    constructor(ImagePath) {
        super().loadImage(ImagePath);
    }
}