const canvasContainer = document.getElementById('canvas-container');
// const renderer로 하면 문법 자체가 오류남, 사유: 나중에 값 넣기 불가임
let renderer;

const INITIAL_W = 600;
const INITIAL_H = 400;
const INITIAL_RATIO = INITIAL_W / INITIAL_H;

// 시계 만들기: 타일로..? 해보기 도전! 일단 시계 원리 해보기
let currentH;
let currentM;
let currentS;

function setup() {
  render = createCanvas(INITIAL_W, INITIAL_H);
  render.parent(canvasContainer);
  render.elt.style.aspectRatio = `${INITIAL_W} / ${INITIAL_H}`;

  new ResizeObserver(() => {
    const { width: containerWidth, height: containerHeight } =
      canvasContainer.getBoundingClientRect();
    render.elt.style.width = `${containerWidth}px`;
    render.elt.style.height = `${containerWidth / INITIAL_RATIO}px`;
  }).observe(canvasContainer);
}

function draw() {
  background(220);
  currentH = hour();
  currentM = minute();
  currentS = second();
  textSize(70);
  textAlign(CENTER);
  text(`${currentH}`, INITIAL_W / 3, INITIAL_H / 2);
  text(`${currentM}`, INITIAL_W / 2, INITIAL_H / 2);
  text(`${currentS}`, INITIAL_W / 1.5, INITIAL_H / 2);
  // console.log(currentH);
}
