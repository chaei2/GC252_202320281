const canvasContainer = document.getElementById('canvas-container');
// const renderer로 하면 문법 자체가 오류남, 사유: 나중에 값 넣기 불가임
let render;

// 시계 만들기: 타일로..? 해보기 도전! 일단 시계 원리 해보기
const INITIAL_W = 275 * 2;
const INITIAL_H = 300;
const INITIAL_RATIO = INITIAL_W / INITIAL_H;

// 일단 현재 상태를 false로 해놓기
// state = 타일의 상태
// 타일의 크기 = 400px * 2000px
// let state = false;
// state가 음 false인건 상관 없나..? 어차피 그냥 숫자 만드는건데..

let gravity = 0.35;
let bounce = 0.65;

// 시 분 초 다 다르게 떨어질려면... 일단 변수 나눠...
let reH = null;
let reM = null;
let reS = null;

// let dropY = 0;
let dropYH = 0;
let dropYM = 0;
let dropYS = 0;

// let dropSpeed = 3.18;
let dropSpeedH = 3.18;
let dropSpeedM = 3.18;
let dropSpeedS = 3.18;

const IMGS = {
  0: [1, 2, 1],
  1: [10, 10, 1],
  2: [3, 4, 5],
  3: [4, 4, 1],
  4: [6, 7, 1],
  5: [5, 4, 3],
  6: [1, 4, 3],
  7: [8, 8, 1],
  8: [1, 4, 1],
  9: [5, 4, 1],
  '-': [10, 9, 10],
  ' ': [10, 10, 10],
};

let tileImgs = [];

let colour;
let colour2;
let colour3;
let colour4;
let randomColour;
let randomColour2;
let randomColour3;
let randomColour4;

function preload() {
  for (let n = 1; n <= 10; n++) {
    // tileImgs[n] = loadImage(`./source/${n}.svg`);
    tileImgs[n] = loadImage(`./source2/${n}.svg`);
  }
}

function setup() {
  render = createCanvas(INITIAL_W, INITIAL_H);
  render.parent(canvasContainer);
  render.elt.style.aspectRatio = `${INITIAL_W} / ${INITIAL_H}`;

  new ResizeObserver(() => {
    const { width: containerWidth } = canvasContainer.getBoundingClientRect();
    render.elt.style.width = `${containerWidth}px`;
    render.elt.style.height = `${containerWidth / INITIAL_RATIO}px`;
  }).observe(canvasContainer);
  colour = [
    '#a8fff8ff',
    '#f878a1ff',
    '#dae1ffff',
    '#ffa8f5ff',
    '#efcdffff',
    '#fff4d6ff',
  ];
  colour2 = [
    '#b1ffa8ff',
    '#78f896ff',
    '#889effff',
    '#fff5a8ff',
    '#ffcddaff',
    '#9dbaffff',
  ];
  colour3 = [
    '#b7a8ffff',
    '#d5ff62ff',
    '#889effff',
    '#fff5a8ff',
    '#ffcddaff',
    '#9dbaffff',
  ];
  colour4 = [
    '#d8a8ffff',
    '#78e7f8ff',
    '#ffbff2ff',
    '#fff5a8ff',
    '#ffcdf7ff',
    '#ef9dffff',
  ];

  randomColour = random(colour);
  randomColour2 = random(colour2);
  randomColour3 = random(colour3);
  randomColour4 = random(colour4);
}

// 문자열, x, y, 가로 사이즈,세로 사이즈 넣고, 문자열간의 갭을 주는데,,,.... 이미지 문자열이 있으면 넣고 없으면 빈칸으로 남겨라는거임 어래이로 넣은거 꺼내서 쓰는거임 ㅇㅇ 널 병합 연산자임
// 삼항 연산자 조건 ? A : B, ??는 그냥 널 병합 연산자
// a ?? b -> a가 null도 아니고 undefined도 아니면 a 그 외는 b
//
function drawImage(charater, x, y, sizeW, sizeH) {
  const ids = IMGS[charater] ?? IMGS[' '];
  for (let idx = 0; idx < 3; idx++) {
    // 이미지 하나에 대한 사이즈 고려
    image(tileImgs[ids[idx]], x + idx * sizeW, y, sizeW, sizeH);
  }
}

function draw() {
  background(randomColour);
  let tileW = 20;
  let tileH = 100;

  // rectMode(CENTER);
  noStroke();
  rect(0, 0, tileW * 6 + tileW / 2, INITIAL_H);
  fill(randomColour2);

  noStroke();
  rect(210, 0, tileW * 6 + tileW / 2, INITIAL_H);
  fill(randomColour3);

  noStroke();
  rect(420, 0, tileW * 6 + tileW / 2, INITIAL_H);
  fill(randomColour4);

  // const blank = 'false';
  // 문자열의 총 길이가 2가되도록 앞부분ㅂ에 '0'을 채움 예)"09"
  const hh = String(hour()).padStart(2, '0');
  const mm = String(minute()).padStart(2, '0');
  const ss = String(second()).padStart(2, '0');

  // 어 =..?
  if (hh !== reH) {
    reH = hh;
    dropYH = 0;
    dropSpeedH = 0;
  }
  if (mm !== reM) {
    reM = mm;
    dropYM = 0;
    dropSpeedM = 0;
  }
  if (ss !== reS) {
    reS = ss;
    dropYS = 0;
    dropSpeedS = 0;
  }

  const s = second();
  const clockNone = ' ';
  const clockH = `${hh}`;
  const clockD = '-';
  const clockM = `${mm}`;
  const clockS = `${ss}`;

  let x = 0;
  let bottomY = INITIAL_H / 2 - 50;

  let yH = bottomY + dropYH;
  let yM = bottomY + dropYM;
  let yS = bottomY + dropYS;

  let y = bottomY;

  // ..? 굳이 바꿀 필요가 있나 으으음?일단 뭔가 이상한디
  // 전체 너비에서 뺴는거면 ㅓ...? ㅇㅂㅇ)..? 아직 뺄 필요 없는거 같은디 아마도

  // 중력이랑 스피드 다 더해서 하나로
  const floorOffset = INITIAL_H - tileH * 2;

  dropSpeedH += gravity * 0.003;
  dropYH += dropSpeedH;

  dropSpeedM += gravity * 0.01;
  dropYM += dropSpeedM;

  dropSpeedS += gravity * 0.5;
  dropYS += dropSpeedS;

  if (dropYH > floorOffset) {
    dropYH = floorOffset;
    dropSpeedH *= -bounce;
  }

  if (dropYM > floorOffset) {
    dropYM = floorOffset;
    dropSpeedM *= -bounce;
  }

  if (dropYS > floorOffset) {
    dropYS = floorOffset;
    dropSpeedS *= -bounce;
  }

  // ㅇㄴ 갭이 필요한가..?
  // gap = 0;

  for (let charater of clockH) {
    drawImage(charater, x, yH, tileW, tileH);
    x += tileW * 3.5;
    // y += tileH;
  }

  for (let charater of clockD) {
    drawImage(charater, x, y, tileW, tileH);
    x += tileW * 3.5;
    // y = tileH;
  }

  for (let charater of clockM) {
    drawImage(charater, x, yM, tileW, tileH);
    x += tileW * 3.5;
    // y += tileH;
  }

  for (let charater of clockD) {
    drawImage(charater, x, y, tileW, tileH);
    x += tileW * 3.5;
    // y -= tileH;
  }

  for (let charater of clockS) {
    drawImage(charater, x, yS, tileW, tileH);
    x += tileW * 3.5;
  }
  for (let charater of clockNone) {
    drawImage(charater, x, y, tileW, tileH);
    // x += tileW * 3.5;
    y += tileH;
  }
}

// 일단 나중에 만들거 놔두고...
function mousePressed() {}
