const canvasContainer = document.getElementById('canvas-container');
let renderer;

const INITIAL_W = 800;
const INITIAL_H = 600;
const INITIAL_RATIO = INITIAL_W / INITIAL_H;

// 맥 키보드 백콤 쓰는법-> 한영키 + ₩키 동시에 누름됨
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
  // resize 되는 화면 만들기
}

function draw() {
  background(0);
  fill('red');
  noStroke();
  circle(mouseX, mouseY, 50);
}
