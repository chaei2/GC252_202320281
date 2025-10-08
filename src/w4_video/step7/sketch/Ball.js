class Ball {
  pos;
  vel;
  diameter;
  colour;
  // isMouseInside;
  isGrabbbed;
  grabOffset;

  // random2D unit => 길이가 1짜리인 랜덤 벡터
  // mag() 메그닉튜드 => 길이가 몇인지 알려줌
  // setMag()=> 길이를 정해줄 수 있음

  constructor(diameter, speed, colour) {
    this.pos = createVector(width / 2, height / 2);
    this.vel = p5.Vector.random2D().setMag(speed);
    this.diameter = diameter;
    this.colour = colour;
    this.isGrabbbed = false;
    this.grabOffset = createVector(0, 0);
    // this.isMouseInside = false;
    // console.log('this.daimeter', this.diameter);
  }

  init(x, y, speed) {
    this.pos.set(x, y);
    const randomAngle = Math.random() * 360;
    this.vel.setHeading(radians(randomAngle));
    this.vel.setMag(speed);
  }

  drag(x, y) {
    // 방법1을 좀 더 뜯어보면( 더 쉬운 버전은 아래)
    // this.pos.set(p5.Vector.add(this.grabOffset, createVector(x, y)));
    this.pos.set(x, y);
    this.pos.add(this.grabOffset);
  }

  applyGravity() {
    if (this.isGrabbbed) return;

    this.vel.y += gravity;
  }

  update() {
    if (this.isGrabbbed) return;
    this.pos.add(this.vel);
  }

  resolveWallCollision() {
    if (this.isGrabbbed) return;
    if (
      this.pos.x < this.diameter / 2 ||
      this.pos.x > width - this.diameter / 2
    ) {
      this.pos.x =
        this.pos.x < this.diameter / 2
          ? this.diameter / 2
          : width - this.diameter / 2;
      this.vel.x *= -restitution;
    }
    if (
      this.pos.y < this.diameter / 2 ||
      this.pos.y > height - this.diameter / 2
    ) {
      this.pos.y =
        this.pos.y < this.diameter / 2
          ? this.diameter / 2
          : height - this.diameter / 2;
      this.vel.y *= -restitution;
    }
  }

  // setMouseInside(x, y) {
  //   // 방법1(귀찮지만 가장 맏음직한 방법)
  //   const dx = x - this.pos.x;
  //   const dy = y - this.pos.y;
  //   // 제곱근 방식 2개
  //   // const distance = Math.sqrt(dx * dx + dy * dy);x
  //   const distance = (dx ** 2 + dy ** 2) ** (1 / 2);
  //   this.isMouseInside = distance <= this.diameter / 2;
  // }

  isMouseInside(x, y) {
    // 방법1(귀찮지만 가장 맏음직한 방법)
    const dx = x - this.pos.x;
    const dy = y - this.pos.y;
    // 제곱근 방식 2개
    // const distance = Math.sqrt(dx * dx + dy * dy);x
    const distance = (dx ** 2 + dy ** 2) ** (1 / 2);
    return distance <= this.diameter / 2;
  }

  grab(x, y) {
    // this.grabOffset.set(p5.Vector.sub(this.pos, createVector(x, y)));
    this.grabOffset.set(this.pos);
    this.grabOffset.sub(x, y);
    this.vel.set(0, 0);

    console.log('grabOffset', this.grabOffset);
    this.isGrabbbed = true;
  }

  ungrab() {
    this.isGrabbbed = false;
  }

  show(isHovered) {
    if (isHovered) {
      noFill();
      stroke(this.colour);
    } else {
      noStroke();
      fill(this.colour);
    }

    circle(this.pos.x, this.pos.y, this.diameter);
  }

  showDebug() {
    stroke('white');
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.vel.x * 10,
      this.pos.y + this.vel.y * 10
    );
    stroke('red');
    line(this.pos.x, this.pos.y, this.pos.x + this.vel.x * 10, this.pos.y);
    stroke('green');
    line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.vel.y * 10);
  }
}
