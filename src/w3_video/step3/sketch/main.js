// 삽질 안하는 class 버전
let aBall;
let bBall;
let cBall;
let dBall;

function setup() {
  createCanvas(600, 400);
  aBall = new Ball(0.5 * width, 0.5 * height, 50, 8, 'yellow');
  bBall = new Ball(0.5 * width, 0.5 * height, 100, 8, 'red');
  cBall = new Ball(0.5 * width, 0.5 * height, 140, 8, 'blue');
  dBall = new Ball(0.5 * width, 0.5 * height, 200, 8, 'green');
}

function draw() {
  background(127);

  aBall.update();
  aBall.resolveWallCollision();
  aBall.show();

  bBall.update();
  bBall.resolveWallCollision();
  bBall.show();

  cBall.update();
  cBall.resolveWallCollision();
  cBall.show();

  dBall.update();
  dBall.resolveWallCollision();
  dBall.show();

  // 마우스 따라가는 원
  stroke('white');
  noFill();
  strokeWeight(5);
  circle(mouseX, mouseY, 50);
}

// 무조건 라디안을 사용함
function mousePressed() {
  // aBall.reset(mouseX, mouseY);

  aBall.reset(width * 0.5, height * 0.5);
  bBall.reset(width * 0.5, height * 0.5);
  cBall.reset(width * 0.5, height * 0.5);
  dBall.reset(width * 0.5, height * 0.5);
}
