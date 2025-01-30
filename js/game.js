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

// the fullscreen function + swape the enter - & exit fullscreen icon
function fullscreen() {
  const overlay = document.getElementById('overlay');
  if (!document.fullscreenElement && // Standard in modernen Browsern (Chrome, Firefox, Edge, Opera, Safari ab Version 71)
    !document.webkitFullscreenElement && // Ältere WebKit-basierte Browser (Safari vor v71, ältere Versionen von Chrome & Opera)
    !document.mozFullScreenElement && // Ältere Firefox-Versionen (vor 2015)
    !document.msFullscreenElement // Internet Explorer und ältere Microsoft Edge-Versionen (vor Chromium)
    ) {
    enterFullscreenRequest();
    fullscreenCanvas();
    document.getElementById('exitFullscreen').style.display = 'block';
    document.getElementById('fullscreen').style.display = 'none';
  } else {
    exitFullscreenRequest();
    document.getElementById('fullscreen').style.display = 'block';
    document.getElementById('exitFullscreen').style.display = 'none';
  }
}

// condition to enter fullscreen on every browser
function enterFullscreenRequest() {
  if (overlay.requestFullscreen) {
    overlay.requestFullscreen();
  } else if (overlay.webkitRequestFullscreen) {
    overlay.webkitRequestFullscreen();
  } else if (overlay.mozRequestFullScreen) {
    overlay.mozRequestFullScreen();
  } else if (overlay.msRequestFullscreen) {
    overlay.msRequestFullscreen();
  }
}

// condition to exit fullscreen on every browser
function exitFullscreenRequest() {
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

// condition for canvas fullscreen
function fullscreenCanvas() {
  const canvas = document.getElementById('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
}

// mute and unmute the whole gamesound
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
