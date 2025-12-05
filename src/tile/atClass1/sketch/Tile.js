class Tile {
  pos = [0, 0];
  // size는 0, 0으로 만들면 문제가 될 수 있음
  size = [1, 1];

  // t, l, b, r반시계
  neighbors = [null, null, null, null];
  // 현재 상태는 꺼져있음
  state = false;
  binaryState = '0000';
  tileImgIdx = 0;

  // 현재 매개변수에 대한 값을 넣어줘야함->
  constructor(x, y, w, h, state = false) {
    this.pos[0] = x;
    this.pos[1] = y;
    this.size[0] = w;
    this.size[1] = h;
    this.state = state;
  }

  render(tiles) {
    const [x, y] = this.pos;
    const [w, h] = this.size;
    const cx = x + w / 2;
    const cy = y + h / 2;

    if (this.state) {
      image(
        tiles[this.tileImgIdx],
        this.pos[0],
        this.pos[1],
        this.size[0],
        this.size[1]
      );
    }

    push();
    translate(cx, cy);
    fill('white');
    circle(0, 0, w / 4);
    fill('red');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);

    // 문자랑 문자열이 있음
    // char가 char가 캐릭터의 약자임 At은 어디에 있는

    // t, l, b, r
    text(this.binaryState.charAt(0), 0, -h / 3);
    text(this.binaryState.charAt(1), -w / 3, 0);
    text(this.binaryState.charAt(2), 0, h / 3);
    text(this.binaryState.charAt(3), w / 3, 0);
    pop();
  }

  setNeighbor(t, l, b, r) {
    this.neighbors[0] = t;
    this.neighbors[1] = l;
    this.neighbors[2] = b;
    this.neighbors[3] = r;
  }

  computeState() {
    let binaryString = '';

    this.neighbors.forEach((aNeighbor) => {
      // if (aNeighbor) {
      //   // true면 1 넣을게, false면 0 넣을게임
      //   binaryString += aNeighbor.state ? '1' : '0';
      // } else {
      //   binaryString += 0;
      // }
      // 저장을 해놓는 것임
      // this.binaryState = binaryString;
      binaryString += aNeighbor?.state ? '1' : '0';
    });
    // 이진수로 변환해주는 코드
    this.tileImgIdx = parseInt(binaryString, 2);
  }

  isHovered(mx, my) {
    return (
      mx >= this.pos[0] &&
      mx <= this.pos[0] + this.size[0] &&
      my >= this.pos[1] &&
      my <= this.pos[1] + this.size[1]
    );
  }

  toggleState() {
    this.state = !this.state;
  }
}
