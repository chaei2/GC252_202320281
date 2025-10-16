class Evader {
  constructor(x, y, options) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = options?.r || 25;
    this.colour = options?.colour || '#00FF00';
    this.maxSpeed = options?.maxSpeed || 5;
    this.maxForce = options?.maxForce || 0.05;
  }

  findClosestPursuer(pursuers) {
    let closest = null;
    let minDist = Infinity;
    for (const p of pursuers) {
      const d = this.pos.dist(p.pos);
      if (d < minDist) {
        minDist = d;
        closest = p;
      }
    }
    return closest;
  }

  separate(pursuers) {
    for (const p of pursuers) {
      if (p !== this) {
        const d = this.pos.dist(p.pos);
        const sum = createVector(0, 0);
        if (d > 0 && d < this.r * 2) {
          const towardMe = p5.Vector.sub(this.pos, p.pos);
          towardMe.div(d);
          sum.add(towardMe);
        }
        if (sum.mag() > 0) {
          sum.setMag(this.maxSpeed);
          sum.add(this.pos);
          this.seek(sum);
        }
      }
    }
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    let steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxForce);
  }

  flee(target) {
    this.seek.applyForce(streeing.mult(-1));
    // let desired = p5.Vector.sub(target, this.pos);
    // desired.setMag(this.maxSpeed);
    // let steering = p5.Vector.sub(desired, this.vel);
    // steering.limit(this.maxForce);
    // this.applyForce(steering.mult(-1));
    return steering;
  }

  evade(pursuers, prediction = 30) {
    const closest = this.findClosestPursuer(pursuers);
    if (!closest) return;
    const predictedVel = p5.Vector.mult(closest.vel, prediction);
    let futurePos = p5.Vector.add(closest.pos, predictedVel);
    this.flee(futurePos);
    this.flee(closest.pos);
    this.flee(p5.Vector.add(closest.pos, predictedVel));
    this.flee(futurePos).limit(this.maxForce);
    return predictedVel;
    // 더 작성해야 작동합니다.
  }

  wrapCoordinates() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  show() {
    const angle = this.vel.heading();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(angle);
    noStroke();
    fill(this.colour);
    beginShape();
    vertex(0, 0);
    vertex(this.r * Math.cos(radians(-160)), this.r * Math.sin(radians(-160)));
    vertex(this.r * Math.cos(radians(160)), this.r * Math.sin(radians(160)));
    endShape();
    pop();
  }
}
