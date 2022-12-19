# 10print
기말과제 10print 저널링 작성하기

let t = 0;
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
      const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      const angle = xAngle * (x / width) + yAngle * (y / height);
      const myX = x + 20 * cos(2 * PI * t + angle);
      const myY = y + 20 * sin(2 * PI * t + angle);

   if (random() > p) {
  	ellipse(myX, myY, 10);
  } else {
  	rect(myX, myY, 10, 10);
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
