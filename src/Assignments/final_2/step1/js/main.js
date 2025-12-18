const canvasContainer = document.getElementById('canvas-container');
// const renderer로 하면 문법 자체가 오류남, 사유: 나중에 값 넣기 불가임
let render;

// 시계 만들기: 타일로..? 해보기 도전! 일단 시계 원리 해보기
const INITIAL_W = 1000;
const INITIAL_H = 400;
const INITIAL_RATIO = INITIAL_W / INITIAL_H;

// 일단 현재 상태를 false로 해놓기
// state = 타일의 상태
// 타일의 크기 = 400px * 400px
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
  false: [10, 10, 10],
};

let tileImgs = [];

function preload() {
  for (let n = 1; n <= 10; n++) {
    tileImgs[n] = loadImage(`./source/${n}.svg`);
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
}

function draw() {
  background(0);
}
