# 10print
기말과제 10print 저널링 작성하기
let system;
let t = 0;
let x, y;
x = 0;
y = 0;

let w = 20;
let p = 0.5;

function setup() {
    system = new ParticleSystem(createVector(width / 2, 50));
  createCanvas(400, 400);
  background(random(70,90), random(110,130),random(160,180));
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
  system.addParticle();
  system.run();
  
}

let Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 255;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(127, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};