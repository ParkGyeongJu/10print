let t = 0;
let x, y;
x = 0;
y = 0;

let w = 20;
let p = 0.5;

function setup() {
  createCanvas(400, 400);
  background(random(70,90), random(110,130),random(160,180));
  stroke(200);
  
    particleSystem = new ParticleSystem(createVector(width / 2, 50));
}

function draw() {
      const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      const angle = xAngle * (x / width) + yAngle * (y / height);
  
  
      const myX = x + 20 * cos(2 * PI * t + angle);
      const myY = y + 20 * sin(2 * PI * t + angle);
  
  if (random() > p) {
      ellipse(myX, myY, random(10,15));
      fill(random(30,50), random(40,60),random(120,140));
    noStroke();

  } else {

      rect(myX, myY, random(10,15), random(10,15));
          fill(random(30,50), random(40,60),random(120,140));
        noStroke();
  }
  
  x = x + w;
  
  if (x > width) {
    y = y + w;
    x = 0;
  }
  
  if (y > height) {
    background(random(70,90),random(110,130),random(160,180));
    x = 0;
    y = 0;
  }
    t = t + 0.01
    particleSystem.run();
}


function mouseDragged(e) {
  particleSystem.origin = createVector(mouseX, mouseY);
  particleSystem.addParticle();
  return false;
}


class Particle {

  constructor(position) {
    this.acceleration = createVector(0, 0.15);
    this.velocity = createVector(random(-2, 2), random(-2, 0));
    this.position = position.copy();
    this.lifespan = 255;
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 12;
  }


  display() {
    stroke(100, this.lifespan);
    strokeWeight(3);
    fill(255, this.lifespan*2);
    ellipse(this.position.x, this.position.y, random(30,50), random(30,50));
  }

  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}


class ParticleSystem {

  constructor(position) {
    this.origin = position.copy();
    this.particles = [];
  }

  addParticle() {
    let r = random(1);
    if (r < 0.5) {
      this.particles.push(new Particle(this.origin));
    } else {

    }
  }

  run() {
    for (let particle of this.particles) {
      particle.run();
    }
    this.particles = this.particles.filter(particle => !particle.isDead());
  }
}
