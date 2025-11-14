class Evader {
  static FINAL_SIZE = 25;
  constructor(x, y, options) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = options?.r || 25;
    this.colour = options?.colour || '#450693';
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

    // 현재 크기가 최종 크기보다 작을 때만 커지게 하기
    if (this.r < Evader.FINAL_SIZE) {
      const growthRate = 0.002;
      this.r = lerp(this.r, Evader.FINAL_SIZE, growthRate);
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    let steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxForce);
    this.applyForce(steering);
  }

  flee(target) {
    let desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    let steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxForce);
    this.applyForce(steering.mult(-1));
    return steering;
  }

  evade(pursuers, prediction = 30) {
    // 추격자가 없으면 아무것도 안함
    const closest = this.findClosestPursuer(pursuers);
    if (!closest) return;

    // 추격자 미래 위치 예측
    const predictedVel = p5.Vector.mult(closest.vel, prediction);
    let futurePos = p5.Vector.add(closest.pos, predictedVel);

    // 예측된 미래 위치로부터 도망치는 힘을 단 한 번만 적용
    this.flee(futurePos);
    // this.flee(futurePos);
    // this.flee(closest.pos);
    // this.flee(p5.Vector.add(closest.pos, predictedVel));
    // this.flee(futurePos).limit(this.maxForce);
    // return predictedVel;
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

    // 머리 (가장 앞쪽 뾰족한 부분)
    vertex(this.r * 1.5, 0);

    vertex(this.r * 0.5, -this.r * 0.8);

    // 몸통 중앙 (가장 넓은 부분)
    vertex(-this.r * 0.5, -this.r * 0.5);

    // 꼬리 지느러미 위쪽 끝
    vertex(-this.r * 1.5, -this.r * 0.5);

    // 꼬리 중앙 (뒤쪽)
    vertex(-this.r * 1.0, 0);

    // 꼬리 지느러미 아래쪽 끝
    vertex(-this.r * 1.5, this.r * 0.5);

    vertex(-this.r * 0.5, this.r * 0.5);

    vertex(this.r * 0.5, this.r * 0.8);

    endShape(CLOSE);

    pop();
  }
}
