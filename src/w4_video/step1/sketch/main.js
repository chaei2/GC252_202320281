let x, y;
const diameter = 100;
const speed = 5;
let velX, velY;
const gravity = 0.1;
const restitution = 0.9;

// restitution = 반발계수(탄성) - 물리 엔진에서 물체 간의 충돌 시 에너지 손실을 결정하 탄성을 의미

function setup() {
  createCanvas(700, 800);
}

function init() {
  x = width / 2;
  y = height / 2;
  velX = 2;
  velY = 2;
  const randomAngle = Math.random() * 360;
  velX = speed * cos(radians(randomAngle));
  velY = speed * sin(radians(randomAngle));
}

function draw() {
  background(0);

  // 중력 정용 = 속도에 가속도(중력) 더하기
  velY += gravity;

  // 원 위치 업데이트
  x += velX;
  y += velY;

  // 벽 충돌 처리
  // if (x <= diameter / 2 || x >= width - diameter / 2) {
  // velX *= -1;}

  if (x <= diameter / 2 || x > width - diameter / 2) {
    // if (x < diameter / 2) {
    //   x = diameter / 2;
    // } else {
    //   x = width - diameter / 2;
    // }

    // [삼항연산자]x = x < diameter / 2(여기가 참이면) ? diameter / 2(이 값을 넣고) : width - diameter / 2(아니면 이 값을 넣는다);
    // 삼항연산자의 장점-> if 구문 덱스가 늘어나면 보기 힘들어짐을 처리함

    x = x < diameter / 2 ? diameter / 2 : width - diameter / 2;

    velX *= -restitution;
  }
  if (y <= diameter / 2 || y > height - diameter / 2) {
    y = y < diameter / 2 ? diameter / 2 : height - diameter / 2;
    velY *= -restitution;
  }

  // 원 그리기
  noStroke();
  fill('skyblue');
  circle(x, y, diameter);

  // vel 표현
  // 방법 1
  // stroke('white');
  // line(width / 2, height / 2, width / 2 + velX * 10, height / 2 + velY * 10);

  // stroke('red');
  // line(width / 2, height / 2, width / 2 + velX * 10, height / 2);

  // stroke('green');
  // line(width / 2, height / 2, width / 2, height / 2 + velY * 10);

  // 방법2
  stroke('white');
  line(x, y, x + velX * 10, y + velY * 10);

  stroke('red');
  line(x, y, x + velX * 10, y);

  stroke('green');
  line(x, y, x, y + velY * 10);
}

function mousePressed() {
  init();
}
