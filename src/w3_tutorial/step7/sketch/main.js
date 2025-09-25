// 삽질 안하는 class 버전
// 깔끔하게 정리함
// 어래이 사용
let pallete = ['#3C467B', '#50589C', '#636CCB', '#6E8CFB'];
let balls = [];

function setup() {
  createCanvas(600, 400);
  balls.push(new Ball(0.5 * width, 0.5 * height, 50, 8, pallete[0]));
  balls.push(new Ball(0.5 * width, 0.5 * height, 100, 8, pallete[1]));
  balls.push(new Ball(0.5 * width, 0.5 * height, 140, 8, pallete[2]));
  balls.push(new Ball(0.5 * width, 0.5 * height, 200, 8, pallete[3]));
}

function draw() {
  background(127);

  if (mouseIsPressed) {
    createBall();
  }
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
  // createBall();
}

function createBall() {
  let dist = [mouseX, width - mouseX, mouseY, height - mouseY];
  let minDist = min(dist);
  let randomDiameter = random(2 * minDist);
  if (randomDiameter > 100) randomDiameter = 100;
  let randomSpeed = random(3, 13);
  balls.push(
    new Ball(
      mouseX,
      mouseY,
      randomDiameter,
      randomSpeed,
      pallete[balls.length % pallete.length]
    )
  );
}
