const canvasContainer = document.getElementById('canvas-container');
// const renderer로 하면 문법 자체가 오류남, 사유: 나중에 값 넣기 불가임
let render;

let dropY = 0;
let dropSpeed = 3.18;
// 시계 만들기: 타일로..? 해보기 도전! 일단 시계 원리 해보기
const INITIAL_W = 275 * 2;
const INITIAL_H = 300;
const INITIAL_RATIO = INITIAL_W / INITIAL_H;

// 일단 현재 상태를 false로 해놓기
// state = 타일의 상태
// 타일의 크기 = 400px * 2000px
// let state = false;
// state가 음 false인건 상관 없나..? 어차피 그냥 숫자 만드는건데..
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
let randomColour;

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
  randomColour = random(colour);
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
  const blank = 'false';
  // 문자열의 총 길이가 2가되도록 앞부분ㅂ에 '0'을 채움 예)"09"
  const hh = String(hour()).padStart(2, '0');
  const mm = String(minute()).padStart(2, '0');
  const ss = String(second()).padStart(2, '0');

  const s = second();
  const clockNone = ' ';
  const clockH = `${hh}`;
  const clockD = '-';
  const clockM = `${mm}`;
  const clockS = `${ss}`;

  let x = 0;
  let y = INITIAL_H / 2 - 50;

  // ..? 굳이 바꿀 필요가 있나 으으음?일단 뭔가 이상한디
  // 전체 너비에서 뺴는거면 ㅓ...? ㅇㅂㅇ)..? 아직 뺄 필요 없는거 같은디 아마도
  let tileW = 20;
  let tileH = 100;

  dropY += dropSpeed;
  if (dropY > INITIAL_H) dropY = y - INITIAL_H;

  // ㅇㄴ 갭이 필요한가..?
  // gap = 0;

  for (let charater of clockH) {
    drawImage(charater, x, y, tileW, tileH);
    x += tileW * 3.5;
    // y += tileH;
  }

  for (let charater of clockD) {
    drawImage(charater, x, y, tileW, tileH);
    x += tileW * 3.5;
    // y = tileH;
  }

  for (let charater of clockM) {
    drawImage(charater, x, y, tileW, tileH);
    x += tileW * 3.5;
    // y += tileH;
  }

  for (let charater of clockD) {
    drawImage(charater, x, y, tileW, tileH);
    x += tileW * 3.5;
    // y -= tileH;
  }

  for (let charater of clockS) {
    drawImage(charater, x, y + dropY, tileW, tileH);
    x += tileW * 3.5;
  }
  for (let charater of clockNone) {
    drawImage(charater, x, y, tileW, tileH);
    // x += tileW * 3.5;
    y += tileH;
  }
}

function mousePressed() {}
