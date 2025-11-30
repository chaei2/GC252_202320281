const canvasContainer = document.getElementById('canvas-container');
// 혹은 qureySeletor가 있음
// console.log(canvasContainer) 디버깅;
let renderer;

const tileImgs = [];

const tiles = [];
const tilePerRow = 10;
let tileSize;
let tilePerCol;

// 전역변수와 지역변수가 있음(광역변수)
// 오버라이딩하는 경우가 있음, preload

// 일단 하나를 선공한 다음 어래이로 돌리기

const INITIAL_W = 600;
const INITIAL_H = 300;
const INITIAL_RATIO = INITIAL_W / INITIAL_H;

function preload() {
  for (let n = 0; n < 16; n++) {
    // 백틱의 장점: 그 자리를 변수화 시키고 싶은거잖음? 그러면 저렇게 하면 됨
    const urlString = `./assets/${String(n).padStart(2, '0')}.svg`;
    // console.log(urlString);
    tileImgs.push(loadImage(urlString));
  }
}

function tileIdx(col, row) {
  return row * tilePerRow + col;
}

// 맥 키보드 백콤 쓰는법-> 한영키 + ₩키 동시에 누름됨
function setup() {
  // const renderer = createCanvas(INITIAL_W, INITIAL_H);
  render = createCanvas(INITIAL_W, INITIAL_H);
  render.parent(canvasContainer);
  render.elt.style.aspectRatio = `${INITIAL_W} / ${INITIAL_H}`;

  new ResizeObserver(() => {
    const { width: containerWidth, height: containerHeight } =
      canvasContainer.getBoundingClientRect();
    render.elt.style.width = `${containerWidth}px`;
    render.elt.style.height = `${containerWidth / INITIAL_RATIO}px`;
  }).observe(canvasContainer);
  // resize

  console.log(tileImgs[0]);

  // 타일 사이즈 관한
  tileSize = width / tilePerRow;
  tilePerCol = Math.floor(height / tileSize);

  // 가로로가는 for 구문이 있는데, row를 바깥쪽에 설정하고, col을 인쪽에 해줌
  for (let r = 0; r < tilePerCol; r++) {
    for (let c = 0; c < tilePerRow; c++) {
      const x = c * tileSize;
      const y = r * tileSize;
      const randomState = random() < 0.5;
      const newTlile = new Tile(x, y, tileSize, tileSize, randomState);
      tiles.push(newTlile);
    }
  }

  // idx를 받아야, x로는 몇 번 이고, y로는 몇 번인지 알 수 있음
  tiles.forEach((aTile, idx) => {
    const col = idx % tilePerRow;
    const row = Math.floor(idx / tilePerRow);

    const t = row > 0 ? tiles[tileIdx(col, row - 1)] : null;
    const l = col > 0 ? tiles[tileIdx(col - 1, row)] : null;
    const b = row < tilePerCol - 1 ? tiles[tileIdx(col, row + 1)] : null;
    const r = col < tilePerRow - 1 ? tiles[tileIdx(col + 1, row)] : null;

    aTile.setNeighbor(t, l, b, r);
  });

  tiles.forEach((aTile) => {
    aTile.computeState();
  });
}

function draw() {
  background(200);
  fill('yellow');
  noStroke();
  // image(tileImgs[0], mouseX, mouseY, 50, 50);
  circle(mouseX, mouseY, 50);

  tiles.forEach((aTile) => {
    aTile.render(tileImgs);
  });
}
