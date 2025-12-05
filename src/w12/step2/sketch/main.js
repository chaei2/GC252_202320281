const sketchContainer = document.querySelector('#sketch-container');

function setup() {
  createCanvas(600, 600);
  const renderer = createCanvas(600, 600);
  renderer.parent(sketchContainer);

  // 0.5 * width여기에서의 n * width 부분에 대한 값을 정해야함
  strokeWidth = (0.5 * width) / strokeNum - 1;
}

// n * W - W = 총 선 면적 = 를 t로 정의
// stroke 두께에 따른

// 이름 곂치면 터짐
let strokeNum = 50;
let strokeWidth;
let seed = 1;

function draw() {
  randomSeed(seed);

  background(255);
  stroke('#00a6ffff');

  strokeWeight(strokeWidth);
  drawPattern(strokeNum, [random(2 * strokeWidth), 0]);
  // 발광하는 걸 randomseed로 조금 괜찮게 바꿀 수 있음
  stroke('#8F0177');

  for (let n = 0; n < strokeNum; n++) {
    // 임의로 만든 변수들

    // x끼리는 값이 똑같아야함 y끼리는 값이 달라야 1자로 선이 만들어 질 것임
    // normalizing => 보통   const t = n / strokeNum이라고 함
    // 50이 되지 못함
    // (strokeNum - 1)처리를 해줘야 이 num은 stroke 1이랑 숫자가 같아지지 않기 때문임
    const t = n / (strokeNum - 1);
    const x1 = width * t;
    const x2 = x1;
    const y1 = 0;
    const y2 = height;
    line(x1, y1, x2, y2);
  }
}

function drawPattern(strokeNum = 2, begin = [0, 0], size = [width, height]) {
  // 실수로 0을 넣었을때, 발생하는 이슈를 다루기 위한 거임 만약에 0이면 빨리 반환하는 코드
  if (strokeNum <= 1) return;

  const [bx, by] = begin;
  const [w, h] = size;

  for (let n = 0; n < strokeNum; n++) {
    const t = n / (strokeNum - 1);
    const x1 = w * t + bx;

    // bx가 또 더해지니깐
    const x2 = x1;
    // const x2 = x1 + bx;
    const y1 = 0 + by;
    const y2 = h + by;
    line(x1, y1, x2, y2);
  }
}
