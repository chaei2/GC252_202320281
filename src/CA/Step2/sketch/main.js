const canvasContainer = document.getElementById('canvas-container');
let renderer;
// canvas

const INITIAL_W = 800;
const INITIAL_H = 600;
const INITIAL_RATIO = INITIAL_W / INITIAL_H;

// cellsPerRow 한 줄에 몇 개의 칸을 넣을 것인가?-> 80이면 한 칸당 10이 나옴
const cellsPerRow = 80;
let cellsPerColumn;
const cells = [];
let cellSize;

let hoveredCell = null;

// function updateAllGenerations() {
//   const currentRowCnt = Math.floor(cells.length / cellsPerRow);
//   for (let row = 0; row < currentRowCnt; row++) {
//     for (let col = 0; col < cellsPerRow; col++) {
//       const idx = row * cellsPerRow + col;
//       if (row !== 0) {
//         const refIdx = (row - 1) * cellsPerRow + col;
//         cells[idx].state = cells[refIdx].nextState;
//       }
//     }
//     for (let col = 0; col < cellsPerRow; col++) {
//       const idx = row * cellsPerRow + col;
//       cells[idx].computeNextState();
//     }
//   }
// }

function getIdx(r, c) {
  return r * cellsPerRow + c;
}

let cnt = 0;

// 절대 시간에 의존하는 법
// millis(), lastTime, lntervul
let lastTime = 0;
const interval = 1000;

function setup() {
  renderer = createCanvas(INITIAL_W, INITIAL_H);
  renderer.parent(canvasContainer);
  renderer.elt.style.aspectRatio = `${INITIAL_W} / ${INITIAL_H}`;

  new ResizeObserver(() => {
    const { width: containerWidth, height: containerHeight } =
      canvasContainer.getBoundingClientRect();
    renderer.elt.style.width = `${containerWidth}px`;
    renderer.elt.style.height = `${containerWidth / INITIAL_RATIO}px`;
  }).observe(canvasContainer);

  cellSize = width / cellsPerRow;
  cellsPerColumn = Math.floor(height / cellSize);

  // 안에 있는게 더 촘촘하게 가기에 가로로하는 row를 안에 넣는다

  // index = w * r + c

  for (let r = 0; r < cellsPerColumn; r++) {
    for (let c = 0; c < cellsPerRow; c++) {
      const x = c * cellSize;
      const y = r * cellSize;
      const randomState = random() < 0.1;
      const newCell = new Cell(x, y, cellSize, cellSize, randomState);
      cells.push(newCell);
    }
  }

  // 젤 위에 있냐 아래 있냐, 왼 오른을 결정해줘야함
  // index = w * r + c
  // 8을 8ㄹ로 나누면 1이라는 숫자가 뜸
  cells.forEach((cell, idx) => {
    const row = Math.floor(idx / cellsPerRow);
    const col = idx % cellsPerRow;
    const tl = row > 0 && col > 0 ? cells[getIdx(row - 1, col - 1)] : null;
    const t = row > 0 ? cells[getIdx(row - 1, col)] : null;
    const tr =
      row > 0 && col < cellsPerRow - 1 ? cells[getIdx(row - 1, col + 1)] : null;
    const r = col < cellsPerRow - 1 ? cells[getIdx(row, col + 1)] : null;
    const br =
      row < cellsPerColumn - 1 && col < cellsPerRow - 1
        ? cells[getIdx(row + 1, col + 1)]
        : null;
    const b = row < cellsPerColumn - 1 ? cells[getIdx(row + 1, col)] : null;
    const bl =
      row < cellsPerColumn - 1 && col > 0
        ? cells[getIdx(row + 1, col - 1)]
        : null;
    const l = col > 0 ? cells[getIdx(row, col - 1)] : null;
    cell.setNeighbors(tl, t, tr, r, br, b, bl, l);
  });

  // 연산이 1초에 한 번만 일어남
  // frameRate();
}

function draw() {
  // cnt--;
  background(250);
  cells.forEach((aCell) => {
    aCell.computeNextState();
  });

  if (millis() - lastTime > interval) {
    cells.forEach((aCell) => {
      aCell.updateState();
    });
    lastTime = millis();
  }

  cells.forEach((cell) => cell.render(cell === hoveredCell));

  // noStroke();
  // fill('red');
  // textSize(50);
  // textAlign(CENTER, CENTER);
  // text(cnt, width * 0.5, height * 0.5);
}

function mouseMoved() {
  hoveredCell = null;
  for (let idx = 0; idx < cell.length; idx++) {
    if (cells[idx].isHovered(mouseX, mouseY)) {
      hoveredCell = cells[idx];
      break;
    }
  }
  // console.log(hoveredCell);
}

function mousePressed() {
  hoveredCell?.toggleState();
}
