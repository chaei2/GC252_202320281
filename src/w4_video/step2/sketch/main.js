// let x, y;
let pos;
const diameter = 100;
const speed = 5;
// let velX, velY;
let vel;
const gravity = 0.1;
const restitution = 0.9;

// restitution = 반발계수(탄성) - 물리 엔진에서 물체 간의 충돌 시 에너지 손실을 결정하 탄성을 의미

function setup() {
  createCanvas(700, 800);
  init();
}

//Syntax => formAngle (angle, [length]), angle은 방향, length는 길이

function init() {
  // x = width / 2;
  // y = height / 2;
  pos = createVector(width / 2, height / 2);
  console.log(pos);
  console.log('pos.x, pos.y', pos.x, pos.y);

  const randomAngle = Math.random() * 360;

  // velX = speed * cos(radians(randomAngle));
  // velY = speed * sin(radians(randomAngle));
  vel = p5.Vector.fromAngle(radians(randomAngle), speed);
  console.log('vel', pos);
  console.log('vel.x, vel.y', pos.x, pos.y);

  // 해당 각도를 가진 벡터임
}

function draw() {
  background(0);

  // 중력 정용 = 속도에 가속도(중력) 더하기
  // velY += gravity;
  vel.y += gravity;

  // 원 위치 업데이트
  // x += velX;
  // y += velY;
  pos.add(vel);

  // 벽 충돌 처리
  // if (x <= diameter / 2 || x >= width - diameter / 2) {
  // velX *= -1;}

  // [삼항연산자]x = x < diameter / 2(여기가 참이면) ? diameter / 2(이 값을 넣고) : width - diameter / 2(아니면 이 값을 넣는다);
  // 삼항연산자의 장점-> if 구문 덱스가 늘어나면 보기 힘들어짐을 처리함
  // if (x <= diameter / 2 || x > width - diameter / 2) {
  //   x = x < diameter / 2 ? diameter / 2 : width - diameter / 2;

  //   velX *= -restitution;
  // }
  // if (y <= diameter / 2 || y > height - diameter / 2) {
  //   y = y < diameter / 2 ? diameter / 2 : height - diameter / 2;
  //   velY *= -restitution;
  // }
  if (pos.x <= diameter / 2 || pos.x > width - diameter / 2) {
    pos.x = pos.x < diameter / 2 ? diameter / 2 : width - diameter / 2;

    vel.x *= -restitution;
  }
  if (pos.y <= diameter / 2 || pos.y > height - diameter / 2) {
    pos.y = pos.y < diameter / 2 ? diameter / 2 : height - diameter / 2;
    vel.y *= -restitution;
  }

  // 원 그리기
  noStroke();
  fill('skyblue');
  circle(pos.x, pos.y, diameter);

  // 방법.y
  stroke('white');
  line(pos.x, pos.y, pos.x + vel.x * 10, pos.y + vel.y * 10);
  stroke('red');
  line(pos.x, pos.y, pos.x + vel.x * 10, pos.y);

  stroke('green');
  line(pos.x, pos.y, pos.x, pos.y + vel.y * 10);
}

function mousePressed() {
  init();
}
