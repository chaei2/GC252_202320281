// 제일 앞에 있는 공만 잡기
const palette = ['#FEF3E2', '#FAB12F', '#FA812F', '#DD0303'];
const ballNum = 5;
const balls = [];
const diameter = 100;
const speed = 5;
const gravity = 0.1;
const restitution = 0.5;

let hoveredBall = null;
let grabbedBall;

function setup() {
  createCanvas(700, 800);

  for (let n = 0; n < ballNum; n++) {
    const randomDiameter = Math.random() * 150 + 50;
    const randomSpeed = Math.random() * 9 + 1;
    const randomPaletteIdx = Math.floor(Math.random() * palette.length);
    const randomColour = palette[randomPaletteIdx];
    balls.push(new Ball(randomDiameter, randomSpeed, randomColour));
  }
}

function draw() {
  background(0);

  if (grabbedBall) {
    grabbedBall.drag(mouseX, mouseY);
  }

  balls.forEach((aBall) => {
    aBall.applyGravity();
    aBall.update();
    aBall.resolveWallCollision();
    // aBall.setMouseInside(mouseX, mouseY);
  });

  if (!grabbedBall) {
    hoveredBall = null;
    for (let idx = balls.length - 1; idx >= 0; idx--) {
      const aBall = balls[idx];
      if (aBall.isMouseInside(mouseX, mouseY)) {
        hoveredBall = aBall;
        break;
      }
    }
  }

  // console.log('hoveredBall', hoveredBall);

  balls.forEach((aBall) => {
    aBall.show(aBall === hoveredBall);
    aBall.showDebug();
  });
}

function mousePressed() {
  if (keyIsPressed && key == 'Shift') {
    balls.forEach((aBall) => {
      const randomSpeed = Math.random() * 9 + 1;
      aBall.init(mouseX, mouseY, randomSpeed);
    });
  } else {
    if (hoveredBall) {
      grabbedBall = hoveredBall;
      hoveredBall.grab(mouseX, mouseY);
    }
  }
}

function mouseReleased() {
  if (grabbedBall) {
    grabbedBall.ungrab();
    grabbedBall = null;
  }
}
