class Coinbar extends DrawableObject {
  x = 0;
  y = 40;
  width = 175;
  height = 50;
  percentage = 0;
  IMAGES = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
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
