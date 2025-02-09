/**
 * The initializing step, which setting up the world and displays the 
 * canvas.
 * Sets the canvas display style to 'flex'.
 * 
 * @function 
 * @returns {void} This function does not return a value.
 */
function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  canvas.style.display = 'flex';
}

/**
 * Toggles the visibility of the about section.
 * 
 * If the section is hidden or has no display value, it will be shown.
 * If the section is visible, it will be hidden.
 * The arrow icon rotates to indicate that the device needs to be rotated.
 * Smooth scrolling brings the section into canvas view.
 * 
 * @function 
 * @returns {void} This function does not return a value.
 */
function showAbout() {
  if (
    document.getElementsByTagName('section')[0].style.display == '' ||
    document.getElementsByTagName('section')[0].style.display == 'none'
  ) {
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
