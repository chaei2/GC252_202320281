// Ball은 class로
class Ball {
  posX = 0;
  posY = 0;
  diameter = 100;
  speed = 5;
  velX = 1;
  velY = 1;
  colour = 0;

  constructor(x, y, diameter, speed, colour) {
    this.posX = x;
    this.posY = y;
    this.diameter = diameter;
    this.speed = speed;
    this.colour = colour;
    this.resetVelocity();
  }

  update() {
    this.posX += this.velX;
    this.posY += this.velY;
  }

  resolveWallCollision() {
    if (this.posX > width - 0.5 * this.diameter) {
      this.velX *= -1;
    } else if (this.posX < 0.5 * this.diameter) {
      this.velX *= -1;
    }

    if (this.posY > height - 0.5 * this.diameter) {
      this.velY *= -1;
    } else if (this.posY < 0.5 * this.diameter) {
      this.velY *= -1;
    }
  }

  show() {
    if (this.isHovered()) {
      fill(this.colour);
      noStroke();
    } else {
      noFill();
      stroke(this.colour);
    }
    strokeWeight(2);
    circle(this.posX, this.posY, 0.5 * this.diameter);
  }
  reset(x, y) {
    this.posX = x;
    this.posY = y;
    this.resetVelocity();
  }

  resetVelocity() {
    let randomAngle = random(360);
    this.velX = this.speed * cos(radians(randomAngle));
    this.velY = this.speed * sin(radians(randomAngle));
  }

  isHovered() {
    let dx = mouseX - this.posX;
    let dy = mouseY - this.posY;

    // 피타고라스 정리
    // 제곱을 표현하는 또 다른 방법
    // 루트 = sqrt(dx**2 + dy**2)** (1/2)
    // let dist = sqrt(dx**2 + dy**2);

    let distance = sqrt(dx * dx + dy * dy);
    return distance < 0.5 * this.diameter;
  }
}
