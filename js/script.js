// initialisation step
function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  canvas.style.display = 'flex';
}

// Arrow to show more details about the wbsite and movement of the game
function showAbout() {
  if (
    document.getElementsByTagName('section')[0].style.display == '' ||
    document.getElementsByTagName('section')[0].style.display == 'none'
  ) {
    document.getElementsByTagName('section')[0].style.display = 'flex';
    document.getElementById('more-about-arrow').style.rotate = '180deg';
    document.getElementById('more-about-arrow').style.filter =
      'drop-shadow(0px -4px 6px black)';
    document
      .getElementsByTagName('section')[0]
      .scrollIntoView({ behavior: 'smooth', flex: 'end' });
  } else {
    document.getElementsByTagName('section')[0].style.display = 'none';
    document.getElementById('more-about-arrow').style.rotate = '0deg';
    document.getElementById('more-about-arrow').style.filter = '';
  }
}
