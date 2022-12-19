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
      ellipse(myX, myY, 10);
      fill(random(30,50), random(40,60),random(120,140));
    noStroke();

  } else {

      rect(myX, myY, 10, 10);
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
    this.lifespan -= 2;
    
    this.checkEdge();
  }
  
  checkEdge() {
    if (this.position.y > height) {
      this.velocity.y *= -1;
      this.position.y = height;
    }
  }

  display() {
    stroke(255, this.lifespan);
    strokeWeight(2);
    fill(255, this.lifespan);
    ellipse(this.position.x, this.position.y, 12, 12);
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
      this.particles.push(new Confetti(this.origin));
      this.particles.push(new Line(this.origin));
    }
  }

  run() {
    for (let particle of this.particles) {
      particle.run();
    }
    this.particles = this.particles.filter(particle => !particle.isDead());
  }
}


class Confetti extends Particle {
  
  constructor(position) {
    super(position);
    this.w = 12;
    this.synth = new p5.MonoSynth();
    this.c = color(255);

  }
  
  checkEdge() {
    if (this.position.y > height) {
      this.velocity.y *= -0.7;
      this.position.y = height;
      this.w = 40;
      this.c = color(random(100, 200), random(100, 200), random(100, 200));
      
      let tones = ["C3","E3", "G3", "C4", "E4", "G4", "C6", "D6", "E6"];
      this.synth.triggerAttack(tones[floor(random(9))]);
      this.synth.triggerRelease(random(0.1, 0.8)); 
    }
  }

  // Override the display method
  display() {
    rectMode(CENTER);
    fill(this.c, this.lifespan);
    stroke(255, this.lifespan);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    let theta = map(this.position.x, 0, width, 0, TWO_PI * 20);
    rotate(theta);
    rect(0, 0, this.w, this.w);
    pop();
  }
}

class Line extends Particle {
  
  constructor(position) {
    super(position);
    this.w = 12;
  }
  
  display() {
    stroke(255, this.lifespan);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    let theta = map(this.position.x, 0, width, TWO_PI*-2, TWO_PI * 2);
    rotate(theta);
    line(0, 0, 30, 30);
    pop();
  }
}