class Cell {
  pos = [0, 0];
  size = [0, 0];
  state = false;
  nextState = false;
  // 이웃은 확장되어야 함 8개로
  neighbors = [null, null, null, null, null, null, null, null];

  // 룰은 함수로 만들어야 함 일단 삭제
  // rule = '00010011';

  constructor(x, y, w, h, state = false) {
    this.pos = [x, y];
    this.size = [w, h];
    this.state = state;
  }
  // T, B, R, L(시계 방향으로 감아지는게 나음)
  setNeighbors(tl, t, tr, r, br, b, bl, l) {
    this.neighbors[0] = tl;
    this.neighbors[1] = t;
    this.neighbors[2] = tr;
    this.neighbors[3] = r;
    this.neighbors[4] = br;
    this.neighbors[5] = b;
    this.neighbors[6] = bl;
    this.neighbors[7] = l;
  }
  computeNextState() {
    // filter();는 내장 되어있는 함수
    // .length는 몇인가?
    const livingCnt = this.neighbors.filter((aNeighbor) => {
      return aNeighbor?.state;
    }).length;

    // 2랑 3은 여전히 비어있음 3도 해결함(3번은 무조건 살아있는 상태임)
    // else는 내가 정확히 2인 순간임
    if (livingCnt < 2) {
      this.nextState = false;
    } else if (livingCnt > 3) {
      this.nextState = false;
    } else if (livingCnt === 3) {
      this.nextState = true;
    } else {
      this.nextState = this.state;
    }
  }

  updateState() {
    this.state = this.nextState;
  }

  isHovered(mX, mY) {
    return (
      mX >= this.pos[0] &&
      mX <= this.pos[0] + this.size[0] &&
      mY >= this.pos[1] &&
      mY <= this.pos[1] + this.size[1]
    );
  }

  toggleState() {
    this.state = !this.state;
  }

  render(isHovered = false) {
    strokeWeight(2);
    stroke(isHovered ? 'red' : 200);
    if (this.state) {
      fill(0);
    } else {
      noFill();
    }
    rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
  }
}
