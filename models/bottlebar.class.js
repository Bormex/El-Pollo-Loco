/**
 * The 'Bottlebar' class represents a status bar that displays the bottle level.
 * 
 * @extends DrawableObject
 */
class Bottlebar extends DrawableObject {
  x = 175;
  y = 0;
  width = 175;
  height = 50;
  percentage = 0;

  IMAGES = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
  ];

   /**
   * Creates an instance of the 'Bottlebar' class.
   * Loads the images for the bottle status bar and sets its initial position and size.
   * Also sets the initial bottle percentage, which determines the displayed image.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.width;
    this.height;
    this.x;
    this.y;
    this.setPercentage(this.percentage);
  }
}
