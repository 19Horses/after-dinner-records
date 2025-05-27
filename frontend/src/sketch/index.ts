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
    p5.textSize(20);
    p5.textFont(font);
    p5.rectMode(p5.CENTER);

    for (let x = 5; x < p5.width + 30; x += 25) {
      for (let y = 0; y < p5.height; y += 25) {
        pts.push({ x, y });
      }
    }
    p5.noCursor();
  };

  p5.draw = () => {
    p5.background(255, 0);
    p5.text('+', p5.mouseX, p5.mouseY);
  };

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
