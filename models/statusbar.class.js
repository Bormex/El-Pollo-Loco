/**
 * Represents a status bar for displaying health.
 * Extends the 'DrawableObject' class and provides functionality for 
 * displaying a health bar.
 * 
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  x = 0;
  y = 0;
  width = 175;
  height = 50;
  percentage = 100;

  IMAGES = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
  ];

  /**
   * Creates an instance of the status bar, loads images and sets the initial percentage.
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
