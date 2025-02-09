class Endbossbar extends DrawableObject {
  x = 540;
  y = 5;
  width = 175;
  height = 50;
  percentage = 100;

  offset = {
    top: 90,
    left: 20,
    right: 30,
    bottom: 20,
  };

  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];

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
