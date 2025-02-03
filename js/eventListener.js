

/*
*   Wenn DOM einmal geladen wird / bspw 
*   beim laden der Seite und <= 768px ist.
*/
window.addEventListener('DOMContentLoaded', () => {
    //console.log(window.innerWidth);
    if (window.innerWidth <= 768) {
        document.getElementsByTagName('h1')[0].style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
        if (document.getElementsByClassName('rotateDeviceDiv')[0] == undefined) {            
            document.getElementsByTagName('body')[0].innerHTML += rotateDeviceTEMPLATE();
        }
    }   else if (window.innerWidth == 667) {

    } else {
        document.getElementsByTagName('h1')[0].style.display = 'unset';
        document.getElementById('overlay').style.display = 'unset';
        document.getElementsByClassName('rotateDeviceDiv')[0].remove();
    }   
})

/*
*   Wenn die Seite sich durch veränderung der Breite verkleinert / bspw. 
*   beim ziehen mit den Entw. Tools.
*/
window.addEventListener('resize', () => {
    //console.log(window.innerWidth);
    if (window.innerWidth <= 768) {
        document.getElementsByTagName('h1')[0].style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
        if (document.getElementsByClassName('rotateDeviceDiv')[0] == undefined) {            
            document.getElementsByTagName('body')[0].innerHTML += rotateDeviceTEMPLATE();
        }
    } else if (window.innerWidth == 667) {
        
    } else {
        document.getElementsByTagName('h1')[0].style.display = 'unset';
        document.getElementById('overlay').style.display = 'unset';
        document.getElementsByClassName('rotateDeviceDiv')[0].remove();
    }   
})



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