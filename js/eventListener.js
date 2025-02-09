/**
 * Checks if the inner width is less than 667px when the DOM is loaded. 
 * 
 * If the screen width is less than 667px:
 * - If it is, the view of h1 and the overlay will be hidden.
 * - If rotateDeviceDiv's display is not set or is 'none', 
 *   then rotateDeviceDiv will be displayed with 'flex'.
 * 
 * If the screen width is greater than or equal to 667px:
 * - the display style of the first '<h1>' and the element with the id 'overlay' are reset to 'unset'.
 * - the display style of the element with class 'rotateDeviceDiv' is set to 'none'.
 * 
 * @event DOMContentLoaded
 * @listens window#DOMContentLoaded
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

/**
 * Checks if the inner width is less than 667px when the site got resized.
 * 
 * If the screen width is less than 667px:
 *   - The first '<h1>' element is hidden.
 *   - The element with the id 'overlay' is hidden.
 *   - The first elements with the classes 'touch-btns' and 'touch-arrows' are displayed with 'flex'.
 *   - The justifyContent style of the first element with the class 'navigation' is reset.
 *   - If the display style of the element with class 'rotateDeviceDiv' is either empty or 'none', 
 *     it will be set to 'flex'.
 * 
 * If the screen width is greater than or equal to 667px:
 *   - The display style of the first '<h1>' and the element with the id 'overlay' are reset to 'unset'.
 *   - The display style of the element with class 'rotateDeviceDiv' is set to 'none'.
 *
 * @event resize
 * @listens window#resize
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

/**
 * This function listens for the 'keydown' event and updates the 'keyboard' object 
 * with boolean values corresponding to specific key presses.
 * 
 * - Arrow Up (keyCode 38): Sets 'keyboard.UP' to true.
 * - Arrow Down (keyCode 40): Sets 'keyboard.DOWN' to true.
 * - Arrow Left (keyCode 37): Sets 'keyboard.LEFT' to true.
 * - Arrow Right (keyCode 39): Sets 'keyboard.RIGHT' to true.
 * - Spacebar (keyCode 32): Sets 'keyboard.SPACE' to true.
 * - D key (keyCode 68): Sets 'keyboard.KEYD' to true.
 *
 * @event keydown
 * @listens window#keydown
 * @param {KeyboardEvent} e - The keyboard event object containing details of the key pressed.
 */
window.addEventListener('keydown', (e) => {
  if (e.keyCode == 38) keyboard.UP = true;
  if (e.keyCode == 40) keyboard.DOWN = true;
  if (e.keyCode == 37) keyboard.LEFT = true;
  if (e.keyCode == 39) keyboard.RIGHT = true;
  if (e.keyCode == 32) keyboard.SPACE = true;
  if (e.keyCode == 68) keyboard.KEYD = true;
});

/**
 * This function listens for the 'keyup' event and updates the 'keyboard' object 
 * with boolean values corresponding to the release of specific keys.
 * 
 * - Arrow Up (keyCode 38): Sets 'keyboard.UP' to false.
 * - Arrow Down (keyCode 40): Sets 'keyboard.DOWN' to false.
 * - Arrow Left (keyCode 37): Sets 'keyboard.LEFT' to false.
 * - Arrow Right (keyCode 39): Sets 'keyboard.RIGHT' to false.
 * - Spacebar (keyCode 32): Sets 'keyboard.SPACE' to false.
 * - D key (keyCode 68): Sets 'keyboard.KEYD' to false.
 * 
 * @event keyup
 * @listens window#keyup
 * @param {KeyboardEvent} e - The keyboard event object containing details of the key released.
 */
window.addEventListener('keyup', (e) => {
  if (e.keyCode == 38) keyboard.UP = false;
  if (e.keyCode == 40)  keyboard.DOWN = false;
  if (e.keyCode == 37) keyboard.LEFT = false;
  if (e.keyCode == 39) keyboard.RIGHT = false;
  if (e.keyCode == 32) keyboard.SPACE = false;
  if (e.keyCode == 68) keyboard.KEYD = false;
});

/**
 * This function listens for the 'touchstart' event on the window and attaches event listeners 
 * to all elements with the class '.touch-btn'. Each button element has two touch event handlers:
 * 
 * When a 'touchstart' event occurs on the button:
 *   - It calls 'touchEventTrue(button)'.
 *   - It scales the button to 90% of its original size ('button.style.scale = '0.9'').
 * 
 * When a 'touchend' event occurs on the button:
 *   - It calls 'touchEventFalse(button)'.
 *   - It resets the button's scale ('button.style.scale = 'unset'').
 * 
 * These handlers are used to visually indicate when a touch interaction starts and ends.
 *
 * @event touchstart
 * @listens window#touchstart
 */
window.addEventListener('touchstart', () => {
  document.querySelectorAll('.touch-btn').forEach((button) => {
    button.addEventListener('touchstart', (e) => {
      touchEventTrue(button);
      button.style.scale = '0.9';
      e.preventDefault();
    });
    button.addEventListener('touchend', (e) => {
      touchEventFalse(button);
      button.style.scale = 'unset';
      e.preventDefault();
    });
  });
});

/**
 * This function handles touch events when a button with a specific ID is pressed.
 * 
 * - If the button's ID is 'touchLeft', it sets 'keyboard.LEFT' to true.
 * - If the button's ID is 'touchRight', it sets 'keyboard.RIGHT' to true.
 * - If the button's ID is 'touchUp', it sets 'keyboard.UP' to true.
 * - If the button's ID is 'touchThrow', it sets 'keyboard.KEYD' to true.
 *
 * @param {HTMLElement} button - The button element that was touched.
 */
function touchEventTrue(button) {
  if (button.id == 'touchLeft') keyboard.LEFT = true;
  if (button.id == 'touchRight') keyboard.RIGHT = true;
  if (button.id == 'touchUp') keyboard.UP = true;
  if (button.id == 'touchThrow') keyboard.KEYD = true;
}

/**
 * This function handles touch events when a button with a specific ID is released.
 * 
 * - If the button's ID is 'touchLeft', it sets 'keyboard.LEFT' to false.
 * - If the button's ID is 'touchRight', it sets 'keyboard.RIGHT' to false.
 * - If the button's ID is 'touchUp', it sets 'keyboard.UP' to false.
 * - If the button's ID is 'touchThrow', it sets 'keyboard.KEYD' to false.
 *
 * @param {HTMLElement} button - The button element that was released.
 */
function touchEventFalse(button) {
  if (button.id == 'touchLeft') keyboard.LEFT = false;
  if (button.id == 'touchRight') keyboard.RIGHT = false;
  if (button.id == 'touchUp') keyboard.UP = false;
  if (button.id == 'touchThrow') keyboard.KEYD = false;
}