class Tile {
  pos = [0, 0];
  // size는 0, 0으로 만들면 문제가 될 수 있음
  size = [1, 1];

  // t, l, b, r반시계
  neighbors = [null, null, null, null];
  state = false;
  tileImgIdx = 0;

  constructor(x, y, w, h, state = false) {
    this.pos[0] = x;
    this.pos[1] = y;
    this.size[0] = w;
    this.size[1] = h;
    this.state = state;
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

  render(tiles) {
    image(
      tiles[this.tileImgIdx],
      this.pos[0],
      this.pos[1],
      this.size[0],
      this.size[1]
    );
  }
}
