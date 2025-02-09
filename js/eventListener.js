/*
 *   Wenn DOM einmal geladen wird / bspw
 *   beim laden der Seite und <= 768px ist.
 */
window.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth < 667) {
    document.getElementsByTagName('h1')[0].style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.getElementsByClassName('touch-btns')[0].style.display = 'flex !important';
    document.getElementsByClassName('touch-arrows')[0].style.display = 'flex !important';
    if (
      document.getElementsByClassName('rotateDeviceDiv')[0].style.display == '' ||
      document.getElementsByClassName('rotateDeviceDiv')[0].style.display == 'none'
    ) {
      document.getElementsByClassName('rotateDeviceDiv')[0].style.display = 'flex';
    }
  } else {
    document.getElementsByTagName('h1')[0].style.display = 'unset';
    document.getElementById('overlay').style.display = 'unset';
    document.getElementsByClassName('rotateDeviceDiv')[0].style.display = 'none';
  }
});

/*
 *   Wenn die Seite sich durch veränderung der Breite verkleinert / bspw.
 *   beim ziehen mit den Entw. Tools.
 */
window.addEventListener('resize', () => {
  if (window.innerWidth < 667) {
    document.getElementsByTagName('h1')[0].style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.getElementsByClassName('touch-btns')[0].style.display = 'flex !important';
    document.getElementsByClassName('touch-arrows')[0].style.display = 'flex !important';
    document.getElementsByClassName('navigation')[0].style.justifyContent = '';
    if (
      document.getElementsByClassName('rotateDeviceDiv')[0].style.display == '' ||
      document.getElementsByClassName('rotateDeviceDiv')[0].style.display == 'none'
    ) {
      document.getElementsByClassName('rotateDeviceDiv')[0].style.display = 'flex';
    }
  } else {
    document.getElementsByTagName('h1')[0].style.display = 'unset';
    document.getElementById('overlay').style.display = 'unset';
    document.getElementsByClassName('rotateDeviceDiv')[0].style.display = 'none';
  }
});

// action on keydown
window.addEventListener('keydown', (e) => {
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.KEYD = true;
  }
});

// do nothing on key up
window.addEventListener('keyup', (e) => {
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
});

// For Touch Devices (Touchscreen)
window.addEventListener('touchstart', () => {
  document.querySelectorAll('.touch-btn').forEach((button) => {
    button.addEventListener('touchstart', () => {
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
