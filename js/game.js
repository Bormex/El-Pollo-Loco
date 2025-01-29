let canvas;
let world;
let keyboard = new Keyboard();

function startGame() {
  document.getElementsByClassName('overlay-start')[0].style.display = 'none';
  initLevel();
  init();
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

    if (e.keyCode == 87 || e.keyCode == 38) {
        keyboard.UP = false;
        
    }

    if (e.keyCode == 83 || e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 65 || e.keyCode == 37) {
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

function enterFullscreen() {
    if (
        !document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.mozFullScreenElement &&
        !document.msFullscreenElement
      ) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
}

// mute the sound
function muteSound() {
  world.sound = true;
  //console.log(world.sound);
}

// unmute the sound
function unmuteSound() {
  world.sound = false;
  //console.log(world.sound);
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
