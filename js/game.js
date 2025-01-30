let canvas;
let world;
let keyboard = new Keyboard();

function startGame() {
  document.getElementsByClassName('overlay-start')[0].style.display = 'none';
  initLevel();
  init();
  document.getElementsByClassName('navigation')[0].style.display = 'flex';
  console.log('My Character is', world);
}

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  canvas.style.display = 'flex';
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

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 39) { 
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.KEYD = false;
    }
})

function fullscreen() {
  document.getElementById('canvas').requestFullscreen()
}

function gameSound() {
    if (world.sound == false) {
      world.sound = true;
      document.getElementById('unMuteBtn').style.display = 'block';
      document.getElementById('muteBtn').style.display = 'none';
    } else {
      world.sound = false;
      document.getElementById('unMuteBtn').style.display = 'none';
      document.getElementById('muteBtn').style.display = 'block';
    }
}

// Arrow to show more details about the side and movement of the game
function showAbout() {
  if (document.getElementsByTagName('section')[0].style.display == '' || document.getElementsByTagName('section')[0].style.display == 'none') {
    document.getElementsByTagName('section')[0].style.display = 'flex';
    document.getElementById('more-about-arrow').style.rotate = '180deg';
    document.getElementById('more-about-arrow').style.filter = 'drop-shadow(0px -4px 6px black)';
    document.getElementsByTagName('section')[0].scrollIntoView({ behavior: 'smooth', flex: 'end' });
  } else {
    document.getElementsByTagName('section')[0].style.display = 'none';
    document.getElementById('more-about-arrow').style.rotate = '0deg';
    document.getElementById('more-about-arrow').style.filter = '';
  }
}

// For Touch Devices (Touchscreen)
window.addEventListener('touchstart', () => {
  document.querySelectorAll('.touch-btn').forEach(button => {
    button.addEventListener('touchstart', () => {
      //console.log(button.id + " gedrückt");
      if (button.id == 'touchLeft') {
        keyboard.LEFT = true;
        button.style.scale = '0.9';
      }

      if (button.id == 'touchRight') {
        keyboard.RIGHT = true;
        button.style.scale = '0.9';
      }

      if (button.id == 'touchUp') {
        keyboard.UP = true;
        button.style.scale = '0.9';
      }

      if (button.id == 'touchThrow') {
        keyboard.KEYD = true;
        button.style.scale = '0.9';
      }
    });

    button.addEventListener('touchend', () => {
      //console.log(button.id + " losgelassen");
      if (button.id == 'touchLeft') {
        keyboard.LEFT = false;
        button.style.scale = 'unset';
      }

      if (button.id == 'touchRight') {
        keyboard.RIGHT = false;
        button.style.scale = 'unset';
      }

      if (button.id == 'touchUp') {
        keyboard.UP = false;
        button.style.scale = 'unset';
      }

      if (button.id == 'touchThrow') {
        keyboard.KEYD = false;
        button.style.scale = 'unset';
      }
    });
  });
});
