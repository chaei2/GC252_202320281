class Pursuer {
  constructor(x, y, options = {}) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = options.r || 25;
    this.colour = options.colour || '#FF0000';
    this.maxSpeed = options.maxSpeed || 5;
    this.maxForce = options.maxForce || 0.05;

    // 추격자도 뱀처럼 보이게(좀 더 얇고 빠르게)
    const thickness = [24, 26, ...Array(16).fill(28), 24, 20, 16, 12];
    this.animal = new Animal(
      x,
      y,
      /*distConstraint*/ 10,
      /*angleConstraint*/ [radians(165), radians(195)],
      thickness,
      { bodyColour: this.colour, eyeColour: '#fff', segmentGradient: false }
    );
  }

  findClosestEvader(evaders) {
    let closest = null,
      minDist = Infinity;
    for (const e of evaders) {
      const d = this.pos.dist(e.pos);
      if (d < minDist) {
        minDist = d;
        closest = e;
      }
    }
    return closest;
  }

  // 같은 무리끼리 분리(추격자끼리)
  separate(pursuers) {
    const desiredSeparation = this.r * 2;
    const sum = createVector(0, 0);
    let count = 0;
    for (const p of pursuers) {
      if (p === this) continue;
      const d = this.pos.dist(p.pos);
      if (d > 0 && d < desiredSeparation) {
        const diff = p5.Vector.sub(this.pos, p.pos);
        diff.div(d);
        sum.add(diff);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.setMag(this.maxSpeed);
      const steer = p5.Vector.sub(sum, this.vel).limit(this.maxForce);
      this.applyForce(steer);
    }
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.animal.setHeadPos(this.pos);
    this.animal.head.setHeading(this.vel.heading());
    this.animal.update();
  }

  applyForce(force) {
    this.acc.add(force);
  }

  seek(target) {
    const desired = p5.Vector.sub(target, this.pos).setMag(this.maxSpeed);
    const steering = p5.Vector.sub(desired, this.vel).limit(this.maxForce);
    this.applyForce(steering);
  }

  pursue(evaders, prediction = 30) {
    const closest = this.findClosestEvader(evaders);
    if (!closest) return;
    const futurePos = p5.Vector.add(
      closest.pos,
      p5.Vector.mult(closest.vel, prediction)
    );
    this.seek(futurePos);
  }

  wrapCoordinates() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  show() {
    this.animal.showBodyShape();
    this.animal.showEyes();
  }

  showTarget() {
    const closest = this.findClosestEvader(evaders);
    if (!closest) return;
    push();
    noFill();
    stroke(this.colour);
    line(this.pos.x, this.pos.y, closest.pos.x, closest.pos.y);
    pop();
  }
}
