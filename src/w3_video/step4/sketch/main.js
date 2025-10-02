// 삽질 안하는 class 버전
// let aBall;
// let bBall;
// let cBall;
// let dBall;

// 어래이 사용
let balls = [];

function setup() {
  createCanvas(600, 400);
  // aBall = new Ball(0.5 * width, 0.5 * height, 50, 8, 'yellow');
  // bBall = new Ball(0.5 * width, 0.5 * height, 100, 8, 'red');
  // cBall = new Ball(0.5 * width, 0.5 * height, 140, 8, 'blue');
  // dBall = new Ball(0.5 * width, 0.5 * height, 200, 8, 'green');

  balls.push(new Ball(0.5 * width, 0.5 * height, 50, 8, 'yellow'));
  balls.push(new Ball(0.5 * width, 0.5 * height, 100, 8, 'red'));
  balls.push(new Ball(0.5 * width, 0.5 * height, 140, 8, 'blue'));
  balls.push(new Ball(0.5 * width, 0.5 * height, 200, 8, 'green'));
}

function draw() {
  background(127);

  // aBall.update();
  // aBall.resolveWallCollision();
  // aBall.show();

  // bBall.update();
  // bBall.resolveWallCollision();
  // bBall.show();

  // cBall.update();
  // cBall.resolveWallCollision();
  // cBall.show();

  // dBall.update();
  // dBall.resolveWallCollision();
  // dBall.show();

  // 방법1
  // for (let idx = 0; idx < balls.length; idx++) {
  //   balls[idx].update();
  //   balls[idx].resolveWallCollision();
  //   balls[idx].show();
  // }

  // 방법2
  // for (let aBall of balls) {
  //   aBall.update();
  //   aBall.resolveWallCollision();
  //   aBall.show();
  // }

  // 방법3 forEach
  balls.forEach((aBall) => {
    aBall.update();
    aBall.resolveWallCollision();
    aBall.show();
  });

  // 마우스 따라가는 원
  stroke('white');
  noFill();
  strokeWeight(5);
  circle(mouseX, mouseY, 50);
}

// 무조건 라디안을 사용함
function mousePressed() {
  // aBall.reset(mouseX, mouseY);

  // aBall.reset(width * 0.5, height * 0.5);
  // bBall.reset(width * 0.5, height * 0.5);
  // cBall.reset(width * 0.5, height * 0.5);
  // dBall.reset(width * 0.5, height * 0.5);

  balls.forEach((aBall) => {
    aBall.reset(0.5 * width, 0.5 * height);
  });
}
