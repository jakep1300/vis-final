let mic;
let particles = [];
let numParticles = 1000;
let particleShape = 'triangle';
let micSensitivity = 4;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  if (mic) {
    let vol = mic.getLevel() * micSensitivity;
    for (let i = 0; i < particles.length; i++) {
      particles[i].move(vol);
      particles[i].display();
    }
  }
}

class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(5, 15);
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
  }

  move(vol) {
    this.x += this.speedX * vol;
    this.y += this.speedY * vol;

    if (this.x < 0 || this.x > width) {
      this.speedX *= -1;
    }

    if (this.y < 0 || this.y > height) {
      this.speedY *= -1;
    }
  }

  display() {
    fill(255);
    if (particleShape === 'ellipse') {
      ellipse(this.x, this.y, this.size);
    } else if (particleShape === 'rect') {
      rect(this.x, this.y, this.size, this.size);
    } else if (particleShape === 'triangle') {
      triangle(this.x, this.y, this.x + this.size / 2, this.y + this.size, this.x - this.size / 2, this.y + this.size);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

async function startVisualizer() {
  if (!mic)
    mic = new p5.AudioIn();
    await mic.start();
  }
  for (let i = 0; i < numParticles; i++) {
    particles[i] = new Particle();
  }
}

function updateNumParticles(newNumParticles) {
  numParticles = newNumParticles;
  while (particles.length > numParticles) {
    particles.pop();
  }
  while (particles.length < numParticles) {
    particles.push(new Particle());
  }
}

function updateParticleShape(newShape) {
  particleShape = newShape;
}

function updateMicSensitivity(newSensitivity) {
  micSensitivity = newSensitivity;
}
