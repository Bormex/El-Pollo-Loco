let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My Character is', world);
}

// action on keydown
window.addEventListener('keydown', (e) => {
    //console.log(e);

    if (e.keyCode == 38) {//e.keyCode == 87 || W
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {//e.keyCode == 83 || S
        keyboard.DOWN = true;
    }

    if (e.keyCode == 37) {//e.keyCode == 65 || A
        keyboard.LEFT = true;
    }

    if (e.keyCode == 39) {//e.keyCode == 68 || D
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.KEYD = true;
    }
})

// do nothing on key up
window.addEventListener('keyup', (e) => {
    //console.log(e);

    if (e.keyCode == 87 || e.keyCode == 38) {
        keyboard.UP = false;
        
    }

    if (e.keyCode == 83 || e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 65 || e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 68 || e.keyCode == 39) { 
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.KEYD = false;
    }
})
