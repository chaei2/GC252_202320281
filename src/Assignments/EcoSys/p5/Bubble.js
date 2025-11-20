class Bubble {
  constructor(x, y) {
    // 퍼지게 하기
    this.pos = createVector(x + random(-10, 10), y + random(-10, 10));

    // 위로 올라가게
    this.vel = createVector(random(-0.3, 0.3), random(-1.5, -0.5));

    this.r = random(5, 15);
    this.life = 80;

    // 알파 계산용
    this.maxLife = this.life;
  }

  update() {
    this.pos.add(this.vel);
    this.life--;
  }

  show() {
    const alpha = map(this.life, 0, this.maxLife, 0, 255);

    noFill();
    stroke(255, 255, 255, alpha);
    strokeWeight(2);
    circle(this.pos.x, this.pos.y, this.r * 2);
  }

  isDead() {
    return this.life <= 0;
  }
}

function createBubbleBurst(x, y) {
  // 거품 개수
  const count = floor(random(6, 12));
  for (let i = 0; i < count; i++) {
    bubbles.push(new Bubble(x, y));
  }
}
