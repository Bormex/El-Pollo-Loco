
// das muss in script js !!! 
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    canvas.style.display = 'flex';
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

/*
*   Wenn DOM einmal geladen wird / bspw 
*   beim laden der Seite und <= 768px ist.
*/
window.addEventListener('DOMContentLoaded', () => {
    //console.log(window.innerWidth);
    if (window.innerWidth <= 768) {
        document.getElementsByTagName('h1')[0].style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
        document.getElementsByTagName('body')[0] += rotateDeviceTEMPLATE();
    } else {
        document.getElementsByTagName('h1')[0].style.display = 'unset';
        document.getElementById('overlay').style.display = 'unset';
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
        document.getElementsByTagName('body')[0] += rotateDeviceTEMPLATE();
    } else {
        document.getElementsByTagName('h1')[0].style.display = 'unset';
        document.getElementById('overlay').style.display = 'unset';
    }   
})

function rotateDeviceTEMPLATE() {
    return `
    <img id="rotateDevice" src="assets/img/rotate-device.png" alt="">
    `
}