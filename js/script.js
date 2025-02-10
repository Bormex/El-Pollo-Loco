/**
 * The initializing step, which setting up the world and displays the 
 * canvas.
 * Sets the canvas display style to 'flex'.
 * Restores the volume option out of the localstorage of the browser.
 * 
 * @function 
 * @returns {void} This function does not return a value.
 */
function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  canvas.style.display = 'flex';
  localStorageSavedSound();
}

/**
 * 
 * @param {*} para 
 */
function showMovement(para) {
  if (para) {
    document.getElementById('movementDiv').style.display = 'flex';
  } else {
    document.getElementById('movementDiv').style.display = 'none';
  }
}

/**
 * 
 * @param {*} para 
 */
function showImprint(para) {
  if (para) {
    document.getElementById('imprintDiv').style.display = 'flex';
  } else {
    document.getElementById('imprintDiv').style.display = 'none';
  }
}
