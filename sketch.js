let x, y;
x = 0;
y = 0;

let w = 20;
let p = 0.5;

function setup() {
  createCanvas(400, 400);
  background(0);
  stroke(200);
}

function draw() {
   if (random() > p) {
  	line(x, y, x+w, y+w);
  } else {
  	line(x+w, y, x, y+w);
  }
    x = x + w;
  if (x > width) {
    y = y + w;
    x = 0;
  }
  if (y > height) {
    background(0);
    x = 0;
    y = 0;
  }
}
