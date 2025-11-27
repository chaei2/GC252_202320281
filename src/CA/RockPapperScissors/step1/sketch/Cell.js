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

class Cell {
  pos = [0, 0];
  size = [0, 0];
  // boolen 값을 애당초 false로 생성함
  state = 'papper';
  neighbors = [null, null, null, null, null, null, null, null];
  nextState = 'papper';

  constructor(x, y, w, h, state = 'papper') {
    this.pos = [x, y];
    this.size = [w, h];
    this.state = state;
    this.nextState = state;
  }

  // t, b, r, l(시계 방향으로 감아지게??)일단 8개 중 아무나 하나 잡기
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

  // 8개 중 아무나 하나 잡기 코드??
  pickRandomNeighbor() {
    const idx = Math.floor(Math.random() * 8);
    return this.neighbors[idx];
  }

  // 나 + 랜덤 이웃 한 명
  gameRule() {
    const neighbor = this.pickRandomNeighbor();
    if (!neighbor) {
      this.nextState = this.state;
      return;
    }

    const me = this.state;
    const other = neighbor.state;

    if (me === other) {
      this.nextState = me;
      return;
    }

    // 내가 지는지 정의함
    const iLose =
      (me === 'rock' && other === 'papper') ||
      (me === 'paper' && other === 'scissors') ||
      (me === 'scissors' && other === 'rock');

    // 이웃이 나 잡아 먹음-> 내 상태는 이웃 상태
    if (iLose) {
      this.nextState = other;
    } else {
      this.nextState = me;
    }
  }

  // 한 번 끝나면 업데이트???
  updateState() {
    this.state = this.nextState;
  }

  render() {
    stroke(200);
    noFill();
    rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);

    noStroke();
    if (this.state === 'rock') {
      fill('red');
    } else if (this.state === 'papper') {
      fill('yellow');
    } else if (this.state === 'scissors') {
      fill('green');
    }
    rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
  }
}
