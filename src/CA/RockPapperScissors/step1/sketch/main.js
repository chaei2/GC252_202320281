// 과제-> 락 페이퍼, 시스템을 구현하기
// 생각해볼 수 있음

// 되게 간단함????(그건 아닌듯)
// 상태가 3개가 된 건임 노 true false임
// 1. state에 대해서 이야기 함(0, 1, 2등 다른 수로 표현할 것임)
// 2. (사진 참고)룰 나 있고, 8명 중에 한 명을 랜덤으로 잡아서 다른 스테이트로 바뀌는 경우는 하나 밖에 없음 그 룰만 심플하게 적용한 결과가 있음
// 은근히 까다로운 경우가 있음
// 랜덤으로 잡았는데, 나랑 같은 0이면 아무일도 안일어남
// 1이 내가 이기는 상대야? 2가 내가 이기는 상대야?라는걸 해결해야함
// 모듈러를 상대로 해보는 것도 있을 것임

// 이미 작성한 코드는 보고 해도 괜찮으나, 어디서 복붙해서 오면 안됨
// 해볼려고 노력한 과정이 중요한 것임

const canvasContainer = document.getElementById('canvas-container');
let render;

const INITIAL_W = 800;
const INITIAL_H = 600;
const INITIAL_RATIO = INITIAL_W / INITIAL_H;
// 맥 키보드 백콤 쓰는법-> 한영키 + ₩키 동시에 누름됨

const cellsNum = 80;
const cellSize = 10;
const cells = [];

function getCell(row, col) {
  if (row < 0 || row >= cellsNum || col < 0 || col >= cellsNum) {
    return null;
  }
  return cells[row * cellsNum + col];
}

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

  // 가로 세로 셀 만들기 + 상태는 가위바위보로 셀들 불러오기
  for (let nRow = 0; nRow < cellsNum; nRow++) {
    for (let nCol = 0; nCol < cellsNum; nCol++) {
      let x = nRow * cellSize;
      let y = nCol * cellSize;
      let w = cellSize;
      let h = cellSize;

      const r = Math.random();
      let state;
      if (r < 1 / 3) state = 'rock';
      else if (r < 2 / 3) state = 'paper';
      else state = 'scissors';

      const cell = new Cell(x, y, w, h, state);
      cells.push(cell);
    }
  }

  for (let row = 0; row < cellsNum; row++) {
    for (let col = 0; col < cellsNum; col++) {
      const idx = row * cellsNum + col;
      const cell = cells[idx];
      const tl = get(row - 1, col - 1);
      const t = get(row - 1, col);
      const tr = get(row - 1, col + 1);
      const r = get(row, col + 1);
      const br = get(row + 1, col + 1);
      const b = get(row + 1, col);
      const bl = get(row + 1, col - 1);
      const l = get(row, col - 1);

      cell.setNeighbors(tl, t, tr, r, br, b, bl, l);
    }
  }
}

function draw() {
  background(0);

  // for (const cell of cells) {
  //   cell.render();
  // }

  for (const cell of cells) {
    cell.gameRule();
  }

  for (const cell of cells) {
    cell.updateState();
  }

  for (const cell of cells) {
    cell.render();
  }
}
