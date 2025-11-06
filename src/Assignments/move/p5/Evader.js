class Evader {
  constructor(x, y, options = {}) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = options.r || 25;
    this.colour = options.colour || '#00FF00';
    this.maxSpeed = options.maxSpeed || 5;
    this.maxForce = options.maxForce || 0.05;

    // 뱀 몸통붙이기
    const thickness = [28, 30, 32, ...Array(20).fill(34), 30, 26, 22, 18, 14];
    this.animal = new Animal(
      x,
      y,
      /*distConstraint*/ 12,
      /*angleConstraint*/ [radians(170), radians(190)],
      thickness,
      { bodyColour: this.colour, eyeColour: '#000', segmentGradient: false }
    );
  }

  // 같은 무리끼리 분리(도망자끼리)
  separate(evaders) {
    const desiredSeparation = this.r * 2;
    const sum = createVector(0, 0);
    let count = 0;
    for (const e of evaders) {
      if (e === this) continue;
      const d = this.pos.dist(e.pos);
      if (d > 0 && d < desiredSeparation) {
        const diff = p5.Vector.sub(this.pos, e.pos);
        diff.div(d); // 가까울수록 더 강하게
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

    // 머리 위치/방향 동기화 + 몸통 업데이트
    this.animal.setHeadPos(this.pos);
    this.animal.head.setHeading(this.vel.heading());
    this.animal.update();
  }

  applyForce(force) {
    this.acc.add(force);
  }

  // separation에서 사용됨
  seek(target) {
    const desired = p5.Vector.sub(target, this.pos).setMag(this.maxSpeed);
    const steering = p5.Vector.sub(desired, this.vel).limit(this.maxForce);
    this.applyForce(steering);
    return steering;
  }

  flee(target) {
    const desired = p5.Vector.sub(target, this.pos).setMag(this.maxSpeed);
    const steering = p5.Vector.sub(desired, this.vel).limit(this.maxForce);
    this.applyForce(steering.mult(-1));
    return steering;
  }

  // 가장 위협적인 추격자의 미래 위치를 예측해서 회피
  evade(pursuers, prediction = 30) {
    if (!pursuers || pursuers.length === 0) return;
    // 가장 가까운 추격자
    let closest = null,
      minDist = Infinity;
    for (const p of pursuers) {
      const d = this.pos.dist(p.pos);
      if (d < minDist) {
        minDist = d;
        closest = p;
      }
    }
    if (!closest) return;

    // 미래 위치 예측
    const futurePos = p5.Vector.add(
      closest.pos,
      p5.Vector.mult(closest.vel, prediction)
    );
    // 합력 누적: 미래 위치/현재 위치 둘 다에 대해 약간씩 도망
    this.flee(futurePos);
    this.flee(closest.pos);
  }

  wrapCoordinates() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  show() {
    // 삼각형 대신 뱀 몸체/눈 렌더
    this.animal.showBodyShape();
    this.animal.showEyes();
  }
}
