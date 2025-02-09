let canvas;
let world;
let keyboard = new Keyboard();

//
function startGame() {
  document.getElementsByClassName('overlay-start')[0].style.display = 'none';
  initLevel();
  init();
  document.getElementsByClassName('navigation')[0].style.display = 'flex';
  console.log('My Character is', world);
  document
    .getElementById('canvas')
    .scrollIntoView({ behavior: 'smooth', flex: 'end' });
}

// the fullscreen function + swape the enter - & exit fullscreen icon
function fullscreen() {
  if (
    !document.fullscreenElement && // Standard in modernen Browsern (Chrome, Firefox, Edge, Opera, Safari ab Version 71)
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
    document
      .getElementById('overlay')
      .scrollIntoView({ behavior: 'smooth', flex: 'end' });
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

// restart after lose or win
function restartGame() {
  if (
    document.getElementsByClassName('overlay-win')[0].style.display == 'unset'
  ) {
    document.getElementsByClassName('overlay-win')[0].style.display = 'none';
  }
  if (
    document.getElementsByClassName('overlay-lose')[0].style.display == 'unset'
  ) {
    document.getElementsByClassName('overlay-lose')[0].style.display = 'none';
  }
  initLevel();
  init();
  document.getElementsByClassName('navigation')[0].style.display = 'flex';
}
