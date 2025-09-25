// 공 등속 운동 버전
let pallete = ['#3C467B', '#50589C', '#636CCB', '#6E8CFB'];

let balls = [];
let gravity;

function setup() {
  createCanvas(600, 400);
  for (let n = 0; n < 100; n++) {
    createBall(0.5 * width, 0.5 * height, pallete[n % pallete.length], [1, 5]);
  }

  gravity = createVector(0, 0.1);
}

function createBall(x, y, colour, speed) {
  balls.push(new Ball(x, y, 10, colour, speed, 180));
}

function draw() {
  background(0);

  for (let n = 0; n < 10; n++) {
    createBall(
      0.5 * width,
      0.5 * height,
      pallete[floor(random(pallete.length))],
      [1, 5]
    );
  }

  balls.forEach((aBall) => {
    aBall.applyGravity(gravity);
    aBall.update();
  });

  for (let idx = balls.length - 1; idx >= 0; idx--) {
    if (!balls[idx].isInsideCanvas()) {
      balls.splice(idx, 1);
    }
  }

  balls.forEach((aBall) => {
    aBall.show();
  });

  // 마우스 따라가는 원
  stroke('white');
  noFill();
  strokeWeight(5);
  circle(mouseX, mouseY, 50);
}

function mousePressed() {
  console.log(balls.length);
}
