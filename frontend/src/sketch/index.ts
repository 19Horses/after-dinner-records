import p5 from 'p5';

export function sketch(p5: p5) {
  let pts: { x: number; y: number }[] = [];

  p5.setup = () => {
    p5.createCanvas(innerWidth, innerHeight);
    p5.noStroke();
    p5.imageMode(p5.CENTER);
    p5.textSize(4.5);

    for (let x = 0; x < p5.width; x += 10) {
      for (let y = 0; y < p5.height; y += 10) {
        pts.push({ x, y });
      }
    }
  };

  p5.draw = () => {
    p5.background(255);
    pts.forEach(({ x, y }) => {
      p5.text('+', x, y);
    });
  };

  p5.windowResized = () => {
    pts = [];
    p5.resizeCanvas(innerWidth, innerHeight);
    p5.noStroke();

    for (let x = 0; x < p5.width - 0; x += 10) {
      for (let y = 0; y < p5.height - 0; y += 10) {
        pts.push({ x, y });
      }
    }
  };
}
