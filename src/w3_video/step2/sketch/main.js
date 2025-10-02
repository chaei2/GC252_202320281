let ballPosX;
let ballPosY;
let ballDiameter = 100;
let speed = 5;

// 상황에 따라 공을 바꾸기 위함
let ballVelX = 4;
let ballVelY = -3;

// 선언한 친구는 실행되는 순서상 width가 밖에 있어서 실행되지 않는다.

function setup() {
  createCanvas(600, 400);
  ballPosX = width * 0.5;
  ballPosY = height * 0.5;
}

function draw() {
  background(127);

  // if (mouseIsPressed) {
  // }

  fill('black');
  noStroke();
  circle(mouseX, mouseY, 50);

  // 알아서 움직이는 원
  fill('Blue');
  circle(ballPosX, ballPosY, ballDiameter);

  ballPosX += ballVelX;
  if (ballPosX > width - 0.5 * ballDiameter) {
    ballVelX *= -1;
  } else if (ballPosX < 0.5 * ballDiameter) {
    ballVelX *= -1;
  }

  ballPosY += ballVelY;
  if (ballPosY > height - 0.5 * ballDiameter) {
    ballVelY *= -1;
  } else if (ballPosY < 0.5 * ballDiameter) {
    ballVelY *= -1;
  }
}

// 무조건 라디안을 사용함
function mousePressed() {
  ballPosX = mouseX;
  ballPosY = mouseY;
  let randomAngle = random(360);
  ballVelX = speed * cos(radians(randomAngle));
  ballVelY = speed * sin(radians(randomAngle));
}
