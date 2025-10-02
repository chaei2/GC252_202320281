// 네모 등속 운동 버전
let pallete = ['#3B0270', '#6F00FF', '#E9B3FB', '#FFF1F1'];

let emitters = [];
let gravity;

function setup() {
  createCanvas(600, 400);
  emitters.push(new Emitter(0.5 * width, 0.5 * height));

  gravity = createVector(0, 0.1);
}

function draw() {
  background(0);

  if (mouseIsPressed && frameCount % 5 === 0) {
    emitters.push(new Emitter(mouseX, mouseY));
  }

  emitters.forEach((anEmitter) => {
    anEmitter.emit();
    anEmitter.loop(gravity);
    anEmitter.show();
  });

  // 마우스 따라가는 원
  stroke('white');
  noFill();
  strokeWeight(5);
  rectMode(CENTER);
  translate(mouseX, mouseY);
  rotate(radians(45));
  rect(0, 0, 20, 40);
  pop();
}

function mousePressed() {
  console.log(emitters[0].balls.length);
}
