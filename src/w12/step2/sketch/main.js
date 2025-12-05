const sketchContainer = document.querySelector('#sketch-container');

// 엇갈리는 선을 바꿀려면 blendLines을 바꾸면 됨
function blendLines(
  blendNums = [1],
  lineBegins = [0, 0, 0, height],
  lineEnds = [width, 0, width, height],
  colours = ['black']
) {
  // blendNum.length으로 쓰면 blendNum도 어래이로 바꿔달라는 것임
  for (let c = 0; c < blendNums.length; c++) {
    const blendNum = blendNums[c];
    const cBegin = 4 * c;
    const lineBegin = [
      lineBegins[cBegin],
      lineBegins[cBegin + 1],
      lineBegins[cBegin + 2],
      lineBegins[cBegin + 3],
    ];
    const lineEnd = [
      lineEnds[cBegin],
      lineEnds[cBegin + 1],
      lineEnds[cBegin + 2],
      lineEnds[cBegin + 3],
    ];

    const colour = colours[c];

    const [bx1, by1, bx2, by2] = lineBegin;
    const [ex1, ey1, ex2, ey2] = lineEnd;
    stroke(colour);
    for (let n = 0; n < blendNum + 2; n++) {
      //  blendNum 0 부터 1까지
      const t = n / (blendNum + 1);

      // bx1 + (ex1 - bx1) * t이 방식은 널프?라는 방식임 시작값, 그리고 끝값을
      // 시작 + t * (끝 -시작) 으로 하면 시작일떄 0, 끝일떄 1나옴
      const x1 = bx1 + (ex1 - bx1) * t;
      const y1 = by1 + (ey1 - by1) * t;
      const x2 = bx2 + (ex2 - bx2) * t;
      const y2 = by2 + (ey2 - by2) * t;
      line(x1, y1, x2, y2);
    }
  }

  // const [bx1, by1, bx2, by2] = lineBegin;
  // const [ex1, ey1, ex2, ey2] = lineEnd;
  // stroke(colour);
  // for (let n = 0; n < blendNum + 2; n++) {
  //   //  blendNum 0 부터 1까지
  //   const t = n / (blendNum + 1);

  //   // bx1 + (ex1 - bx1) * t이 방식은 널프?라는 방식임 시작값, 그리고 끝값을
  //   // 시작 + t * (끝 -시작) 으로 하면 시작일떄 0, 끝일떄 1나옴
  //   const x1 = bx1 + (ex1 - bx1) * t;
  //   const y1 = by1 + (ey1 - by1) * t;
  //   const x2 = bx2 + (ex2 - bx2) * t;
  //   const y2 = by2 + (ey2 - by2) * t;
  //   line(x1, y1, x2, y2);
  // }
}

function setup() {
  // createCanvas(600, 600);
  const renderer = createCanvas(600, 600);
  renderer.parent(sketchContainer);
}

let bx1offset = 0;
let bx2offset = 0;
let ex1offset = 0;
let ex2offset = 0;
const offsetRange = 20;
let seed = 0;

function draw() {
  randomSeed(seed);
  bx1offset = random(-offsetRange, offsetRange);
  bx2offset = random(-offsetRange, offsetRange);
  ex1offset = random(-offsetRange, offsetRange);
  ex2offset = random(-offsetRange, offsetRange);

  background(255);
  strokeWeight(7);
  blendLines(
    [50, 51],
    [0 + bx1offset, 0, 0 + bx2offset, height, 0, 0, 0, height],
    [width + ex1offset, 0, width + ex2offset, height, width, 0, width, height],
    ['#360185', '#8F0177']
  );
  // stroke('#360185');
  // blendLines(
  //   50,
  //   [0 + bx1offset, 0 + by2offset, -10, height],
  //   [width + ex1offset, 0, width + ey2offset, height]
  // );
  // stroke('#F4B342');
  // blendLines(51);
}

function mousePressed() {
  seed++;
}
