import p5 from 'p5';

export function sketch(p5: p5) {
  p5.setup = () => {
    p5.createCanvas(innerWidth, innerHeight);
    p5.imageMode(p5.CENTER);
    p5.noCursor();
  };

  p5.draw = () => {
    p5.background(255, 0);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(innerWidth, innerHeight);
  };
}
