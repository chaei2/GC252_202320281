// 변경점: bodyColour, eyeColour 옵션 추가, showBodyShape가 지정색 사용
class Animal {
  constructor(
    x,
    y,
    distConstraint,
    angleConstraint,
    thickness = [40, 30],
    options = {}
  ) {
    this.spine = [];
    this.head = null;
    this.tail = null;
    this.bodyColour = options.bodyColour || '#0F0';
    this.eyeColour = options.eyeColour || '#000';

    push();
    colorMode(HSB, 360, 100, 100);
    for (let idx = 0; idx < thickness.length; idx++) {
      const posX = x;
      const posY = y + distConstraint * idx;
      const hue = map(idx, 0, thickness.length - 1, 0, 240);
      const colour =
        options.segmentGradient === false
          ? color(0, 0, 100)
          : color(hue, 100, 100);
      const pOpts = {
        colour: colour,
        distConstraint: distConstraint,
        angleConstraint: angleConstraint,
      };
      const newPoint = new Point(posX, posY, thickness[idx], pOpts);
      if (idx === 0) this.head = newPoint;
      this.spine.push(newPoint);
    }
    pop();
    this.tail = this.spine[this.spine.length - 1];
    this.headPoints = [];
    this.cwPoints = [];
    this.tailPoints = [];
    this.ccwPoints = [];
    this.bodyPoints = [];
  }

  setHeadPos(pos) {
    this.head.setPos(pos);
  }

  update() {
    this.spine.forEach((p, i) => {
      if (i > 0) p.constrainedBy(this.spine[i - 1], true);
    });
    this.head.setHeading(this.spine[1].heading);

    this.spine.forEach((p, i) => {
      if (i >= 2) p.angleConstrainedBy(this.spine[i - 1], this.spine[i - 2]);
    });

    this.spine.forEach((p, i) => {
      this.cwPoints[i] = p.getPointOnThickness(radians(90));
      this.ccwPoints[this.spine.length - 1 - i] = p.getPointOnThickness(
        radians(-90)
      );
    });

    this.headPoints[0] = this.head.getPointOnThickness(radians(-60));
    this.headPoints[1] = this.head.getPointOnThickness(radians(-30));
    this.headPoints[2] = this.head.getPointOnThickness(radians(0));
    this.headPoints[3] = this.head.getPointOnThickness(radians(30));
    this.headPoints[4] = this.head.getPointOnThickness(radians(60));

    this.tailPoints[0] = this.tail.getPointOnThickness(radians(120));
    this.tailPoints[1] = this.tail.getPointOnThickness(radians(150));
    this.tailPoints[2] = this.tail.getPointOnThickness(radians(180));
    this.tailPoints[3] = this.tail.getPointOnThickness(radians(-150));
    this.tailPoints[4] = this.tail.getPointOnThickness(radians(-120));

    let k = 0;
    const headCenterIdx = Math.floor(0.5 * this.headPoints.length);
    for (let i = headCenterIdx - 1; i <= this.headPoints.length - 1; i++)
      this.bodyPoints[k++] = this.headPoints[i];
    this.cwPoints.forEach((p) => (this.bodyPoints[k++] = p));
    this.tailPoints.forEach((p) => (this.bodyPoints[k++] = p));
    this.ccwPoints.forEach((p) => (this.bodyPoints[k++] = p));
    for (let i = 0; i <= headCenterIdx + 1; i++)
      this.bodyPoints[k++] = this.headPoints[i];
  }

  showBodyShape() {
    push();
    noStroke();
    fill(this.bodyColour);
    beginShape();
    this.bodyPoints.forEach((p) => curveVertex(p.x, p.y));
    endShape();
    pop();
  }

  showEyes() {
    const right = this.head.getPointOnThickness(radians(90), 0, 0.5);
    const left = this.head.getPointOnThickness(radians(-90), 0, 0.5);
    push();
    translate(right.x, right.y);
    rotate(this.head.heading);
    noStroke();
    fill(this.eyeColour);
    circle(0, 0, 5);
    pop();
    push();
    translate(left.x, left.y);
    rotate(this.head.heading);
    noStroke();
    fill(this.eyeColour);
    circle(0, 0, 5);
    pop();
  }

  // (디버그용 표시 함수들은 그대로 둬도 됨)
}
