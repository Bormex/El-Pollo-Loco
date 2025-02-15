let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Starts the game by initializing the levels and setting up the UI.
 * 
 * Hide the start overlay.
 * Calls 'initLevel()' and 'init()' to set up the game world.
 * Displays the navigation UI.
 * Scrolls down into the canvas view.
 * 
 * @function 
 * @returns {void} This function does not return a value.
 */
function startGame() {
  document.getElementsByClassName('overlay-start')[0].style.display = 'none';
  document.getElementsByClassName('more-about')[0].style.display = 'none';
  initLevel();
  init();
  document.getElementsByClassName('navigation')[0].style.display = 'flex';
  document.getElementById('canvas').scrollIntoView({ behavior: 'smooth', block: 'end' });
}

/**
 * Toggles fullscreen mode.
 * 
 * If the page is not in fullscreen mode, it will be activated.
 * If it is already in fullscreen mode, it will be exited.
 * Additionally, it controls button visibility and scrolls down on canvas if game started.
 * 
 * @function 
 * @returns {void} This function does not return a value.
 */
function fullscreen() {
  if (
    !document.fullscreenElement && // Standard in modern browsers (Chrome, Firefox, Edge, Opera, Safari from version 71)
    !document.webkitFullscreenElement && // Older WebKit-based browsers (Safari before v71, older versions of Chrome & Opera)
    !document.mozFullScreenElement && // Older Firefox versions (before 2015)
    !document.msFullscreenElement // Internet Explorer and older Microsoft Edge versions (pre-Chromium)
  ) {
    enterFullscreenRequest();
    fullscreenCanvas();
    document.getElementById('exitFullscreen').style.display = 'block';
    document.getElementById('fullscreen').style.display = 'none';
  } else {
    exitFullscreenRequest();
    document.getElementById('fullscreen').style.display = 'block';
    document.getElementById('exitFullscreen').style.display = 'none';
    document.getElementById('overlay').scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
}

/**
 * Condition to enter fullscreen on every browser
 * 
 * @function 
 * @returns {void} This function does not return a value.
 */
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

/**
 * Condition to exit fullscreen on every browser
 * 
 * @function
 * @returns {void} This function does not return a value.
 */
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

/** 
* Setting up the Canvas Style when it goes fullscreen mode.
*
* @function 
* @returns {void} This function does not return a value.
*/
function fullscreenCanvas() {
  const canvas = document.getElementById('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
}

/**
 * Toggles the whole game sound between muted and unmuted states.
 * If the sound is off, it will be turned on.
 * Also muting the snoring and yawing interval sound of Pepe.
 *
 * @function
 * @returns {void} This function does not return a value.
 */
function gameSound() {
  if (localStorage.getItem('Gamesound') == 'true') {
    world.sound = false;
    localStorage.setItem('Gamesound', world.sound);
    document.getElementById('unMuteBtn').style.display = 'none';
    document.getElementById('muteBtn').style.display = 'block';
  } else {
    world.sound = true;
    world.character.snoring_sound.currentTime = 0;
    world.character.yawing_sound.currentTime = 0;
    world.character.snoring_sound.pause();
    world.character.yawing_sound.pause();
    localStorage.setItem('Gamesound', world.sound);
    document.getElementById('unMuteBtn').style.display = 'block';
    document.getElementById('muteBtn').style.display = 'none';
  }
}


/**
 * Restarts the game after win or lose by hiding the win or lose overlays, re-initializing the game level,
 * and resetting necessary game variables. It also ensures the navigation bar is displayed.
 * 
 * @function
 * @returns {void} This function does not return a value.
 */
function restartGame() {
  const overlay_win = document.getElementsByClassName('overlay-win');
  const overlay_lose = document.getElementsByClassName('overlay-lose');
  if (overlay_win[0].style.display == 'unset') overlay_win[0].style.display = 'none';
  if (overlay_lose[0].style.display == 'unset') overlay_lose[0].style.display = 'none';
  initLevel();
  init();
  document.getElementsByClassName('navigation')[0].style.display = 'flex';
}

/**
 * Restores the game sound out of the local storage.
 * 
 * @function
 * @returns {void} This function does not return a value.
 */
function localStorageSavedSound() {
  if (localStorage.getItem('Gamesound') == 'true') {
    world.sound = true;
    document.getElementById('unMuteBtn').style.display = 'block';
    document.getElementById('muteBtn').style.display = 'none';
  } else {
    world.sound = false;
    document.getElementById('unMuteBtn').style.display = 'none';
    document.getElementById('muteBtn').style.display = 'block';
  }
}