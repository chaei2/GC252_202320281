class Vehicle {
  constructor(x, y, maxSpeed = 5, maxForce = 0.1, friendRad = 70) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 10;
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.friendRad = friendRad;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  seek(target, factor = 1) {
    const desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    const steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxForce);
    this.applyForce(steering.mult(factor));
  }

  separate(allVehicles, factor = 1) {
    const sum = createVector(0, 0);
    allVehicles.forEach((aVehicle) => {
      if (aVehicle !== this) {
        const dist = p5.Vector.dist(this.pos, aVehicle.pos);
        if (dist > 0 && dist < this.r * 3) {
          const towardMe = p5.Vector.sub(this.pos, aVehicle.pos);
          towardMe.div(dist);
          sum.add(towardMe);
        }
      }
    });
    if (sum.mag() > 0) {
      sum.add(this.pos);
      this.seek(sum, factor);
    }
  }

  cohere(allVehicles, factor = 1) {
    let cnt = 0;
    const sum = createVector(0, 0);
    allVehicles.forEach((aVehicle) => {
      if (aVehicle !== this) {
        const dist = p5.Vector.dist(this.pos, aVehicle.pos);
        if (dist < this.friendRad) {
          sum.add(aVehicle.pos);
          cnt++;
        }
      }
    });
    if (cnt > 0) {
      sum.div(cnt);
      this.seek(sum, factor);
    }
  }

  // 방식을 바꿔서 가까이 있는 친구는 강하게, 멀리 있는 친구는 약하게
  cohere2(allVehicles, factor = 1) {
    let cnt = 0;
    const sum = createVector(0, 0);
    allVehicles.forEach((aVehicle) => {
      if (aVehicle !== this) {
        const dist = p5.Vector.dist(this.pos, aVehicle.pos);
        if (dist < this.friendRad) {
          const towardOther = p5.Vector.sub(aVehicle.pos, this.pos);
          // vector = 실제로 바뀌진 않음
          //도출된 towardOther = 실제로 바뀜 벡터를 거리에 반비례하도록 만듦
          // 길이는 달라지되, 방향은 같음
          towardOther.div(dist);
          sum.add(towardOther);
          cnt++;
        }
      }
    });
    if (cnt > 0) {
      sum.div(cnt);
      sum.add(this.pos);
      this.seek(sum, factor);
    }
  }

  align(allVehicles, factor = 1) {
    let cnt = 0;
    const sum = createVector(0, 0);
    allVehicles.forEach((aVehicle) => {
      if (aVehicle !== this) {
        const dist = p5.Vector.dist(this.pos, aVehicle.pos);
        if (dist < this.friendRad) {
          // sum.add(aVehicle.vel);
          sum.add(p5.Vector.div(aVehicle.vel), dist);
          cnt++;
        }
      }
    });
    if (cnt > 0) {
      sum.div(cnt);
      sum.add(this.pos);
      this.seek(sum, factor);
    }
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
    noFill();
    stroke(255);
    // circle(0, 0, 2 * this.r);
    noStroke();
    fill(255);
    beginShape();
    vertex(0, 0);
    vertex(this.r * cos(radians(-160)), this.r * sin(radians(-160)));
    vertex(this.r * cos(radians(160)), this.r * sin(radians(160)));
    endShape(CLOSE);
    pop();
  }

  showVel() {
    push();
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke(0, 255, 0);
    line(0, 0, this.vel.x * 10, this.vel.y * 10);
    pop();
  }

  showAcc() {
    push();
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke(255, 0, 0);
    line(0, 0, this.acc.x * 1000, this.acc.y * 1000);
    pop();
  }
}

// 위치는 절대값, 속도는 상대값
