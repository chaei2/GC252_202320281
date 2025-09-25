// 옛방식
// var ballPosX;

// 선언과 초기화 통합된 방식
// let ballPosX = 100;
let ballPosX;
ballPosX = 100;

let ballDiameter = 200;
let ballPosY;
ballPosY = 100;

function setup() {
  createCanvas(600, 800);
}

function draw() {
  background(127);
  noStroke();
  // 색상을 채우는 방법은 총 3가지 ( rgba, css 이름, 헥스값)
  // fill(255, 0, 0);
  // fill('red');
  fill('#ff0000');
  circle(0, 0, 100);

  fill('skyblue');
  stroke('orange');
  strokeWeight(10);
  circle(width, height, 100);

  fill('green');
  stroke('pink');
  strokeWeight(7);
  circle(width * 0.5, height * 0.5, 100);

  // 마우스에 따라 움직이는 원들
  fill('black');
  noStroke();
  circle(mouseX, mouseY, 100);

  fill('white');
  noStroke();
  circle(mouseY, mouseX, 100);

  // 알아서 움직이는 원
  fill('Pink');
  noStroke();
  circle(ballPosX, ballPosY, ballDiameter);

  // 움직이는 방법 3가지

  // ballPosX = ballPosX + 2;
  // ballPosX += 2;
  // ++는 1씩 증가임
  // ballPosX++;

  ballPosX += 4;
  if (ballPosX > width + 0.5 * ballDiameter) {
    ballPosX -= width + ballDiameter;
  } else if (ballPosX < -0.5 * ballDiameter) {
    ballPosX += width + ballDiameter;
  }

  ballPosY += 6;
  if (ballPosY > width + 0.5 * ballDiameter) {
    ballPosY -= width + ballDiameter;
  } else if (ballPosY < -0.5 * ballDiameter) {
    ballPosY += width + ballDiameter;
  }
}
