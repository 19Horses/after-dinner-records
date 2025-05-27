import p5, { Font } from 'p5';
import bootzy from '../assets/bootzy.ttf';

export function sketch(p5: p5) {
  let pts: { x: number; y: number }[] = [];
  let font: Font;

  p5.preload = () => {
    font = p5.loadFont(bootzy);
  };

  p5.setup = () => {
    p5.createCanvas(innerWidth, innerHeight);
    p5.noStroke();
    p5.imageMode(p5.CENTER);
    p5.textSize(36);
    p5.textFont(font);
    p5.rectMode(p5.CENTER);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.angleMode(p5.DEGREES);

    for (let x = 5; x < p5.width + 30; x += 25) {
      for (let y = 0; y < p5.height; y += 25) {
        pts.push({ x, y });
      }
    }

    const txt = 'AFTER DINNER RECORDS ';
    const radius = p5.width / 6;
    const centerX = p5.width / 4;
    const centerY = p5.height / 2;

    const angleStep = 360 / txt.length;

    p5.push();
    p5.translate(centerX, centerY);
    p5.rotate(-90); // Start at the top of the circle

    for (let i = 0; i < txt.length; i++) {
      p5.push();
      p5.rotate(i * angleStep);
      p5.translate(0, -radius); // Move outward from center
      p5.rotate(90); // Rotate text upright
      p5.fill(0);
      p5.text(txt[i], 0, 0);
      p5.pop();
    }

    p5.pop();
  };

  // p5.draw = () => {
  //   p5.background(255);
  //   pts.forEach(({ x, y }) => {
  //     p5.text('+', x, y);
  //   });
  // };

  p5.windowResized = () => {
    pts = [];
    p5.resizeCanvas(innerWidth, innerHeight);
    p5.noStroke();

    for (let x = 0; x < p5.width + 30; x += 30) {
      for (let y = 0; y < p5.height; y += 30) {
        pts.push({ x, y });
      }
    }
  };
}
