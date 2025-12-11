// 먼저 화면부터 resize 되게 해보기 기초부터 시작
// 시간을 활용한 무언가 만들기

// 게임 룰 바꾸기-> 얘 밥을 많이 맥여서 키우는 게임 멈춰있을떄 애 사이즈가 줄어들음
// 완전히 소멸 될때 게임 끝

// 내가 지금 당장 필요한 값은 무엇인가?
// 일단 주인공 만들기
// 1명, 생김새, 크기, 위치, 색상
// 키는 w,a,s,d
// 색상은 랜덤으로 팔레트에 있는 색 아무거나 지정하게 함

const mainChar = 1;
// 얘는 원으로 그릴거임 아니면 커브 버텍스로..?
let size = 50;
let posX;
let posY;
let move = 4;
let sizeDown = 0.06;

let palette = [
  '#6AECE1',
  '#4ccd91ff',
  '#BB8ED0',
  '#FD7979',
  '#FFEE91',
  '#e68585ff',
  '#7997eaff',
];

let randomColour;

// 게이지 바 만들기, 먹으면 오르고, 아니면 줄어듦 둘이 연동되게 해야함

// 시간 2초 동안 내 위치 보여주고, 나머지는 안 보이게 하는 코드 짜기
// 시간을 음.. ~11)
// If ( H ===0) H +12,
// 값이 다른 순간을 기준으로 잡으면 그떄 나옴 —> 달라? 그러면 나옴

// 일단 쿨타임을 2초 안에서 해결하도록 돌리고

// 1. 화면을 불러야 함
const canvasContainer = document.getElementById('canvas-container');
// 변수 지정 = 문서.아이디요소 가져오기('id에 지정한 이름 호출')
let render;

let firstX = 0;
let firstY = 0;
// render가 되어야 하니깐 함수 미리 호출하면 좋음. 값은 아직 안 넣음

const INITIAL_W = 800;
const INITIAL_H = 600;
let bar;
let barX;
let barY;
let barPosX;
let barPosY;
let barRound = 30;

// INITIAL = 초기의 / 대문자로 명명하는 이유: 바꿀 일 없는 애는 그냥 쐐기 박음(그래야 가독성 좋으니깐..? 아마도)
// 전역 함수= 프로그램 전체에서 사용 가능한 변수
// 지역 함수 특정 함수 내에서만 사용 가능한 변수

// RATIO는 비율
const INITIAL_RATIO = INITIAL_W / INITIAL_H;
// 면적과 길이비는 다름

// 왜 비율 = 가로 / 세로가 될까? 반대로 나눌 수 있지 않나..?
// 1. 가로 먼저 부르는 습관(예: 1920 * 1080 반대로 말하는 경우는 거의 없음)
// 2. 수학 비율 A : B 를 숫자로 계산 할때는 분수 B 분에 A로 계산하는 것이 약속.
// 즉, 너비: 높이로 부르기 때문에 식도 너비 / 높이가 됨(표준)

// 3. 나눗셈에서 분모는 기준(1)이 됨. W/H를 한다는 건, 높이가 1일때, 가로가 얼마인가를 환산하는 과정임-> 옛날부터 스크린은 넓었음, 그들의 관심사: 세로 길이는 뻔한데, 옆으로 얼마나 긴거지?
// 그렇기에 높이를 기준으로 삼고, 너비를 재는 방식으로 굳어진 이유 2

// 4. 그러면 가로가 좁아도 왜 식을 바꾸지 않을까?-> 통일성 때문
// W/H를 써야 숫자만 보고도 모양을 알 수 있기 때문

function setup() {
  render = createCanvas(INITIAL_W, INITIAL_H);

  // 값을 넣어주고
  render.parent(canvasContainer);
  // 이 캔버스의 부모는 canvasContainer야라고 설정해줌

  render.elt.style.aspectRatio = `${INITIAL_W} / ${INITIAL_H}`;

  // render.elt = HTML 태그의 (canvas 속성 가져옴)
  // .style = 그중 스타일을 속성에서 .aspectRatio = 비율을 건들게
  // =>즉, 이 박스 크기를 계산하는데, 태그 속성에서 <canvs>의 스타일 중 비율을 반영해줘 = (내가 적은 값으로)

  // ${...} = 백틱 문자열=> 변수를 문자열 안에 쏙 집어 넣는 문법임
  // 코드 실행시 이렇게 변환해줌 "600 / 800"

  new ResizeObserver(() => {
    // 왜 또 다시 계산해서 넣을까?
    // aspect-ratio는 '모양'을 유지해주는 가이드라인, ResizeObserver는 캔버스 부모 통에 꽉 차게 픽셀 단위로 '크기'를 박아주는 실행범이라서

    const { width: containerWidth, height: containerHeight } =
      canvasContainer.getBoundingClientRect();
    // getBoundingClientRect=> 가져와 경계 클라이언트(보이는 화면 창) 사각형 즉, 눈애 보이는 사각형 경계 창을 가져와
    // 얘가 하는 일? 요소 재고, 객체 줌 예: x, y, w, h, t, l, b,r의 값들
    render.elt.style.width = `${containerWidth}px`;

    // 새로 비율 계산
    render.elt.style.height = `${containerWidth / INITIAL_RATIO}px`;
  }).observe(canvasContainer);
  // containerHeight 안 쓰임

  randomColour = random(palette);
  fill(randomColour);
  posX = INITIAL_W / 2;
  posY = INITIAL_H / 2;

  firstX = 0;
  firstY = 0;

  barX = INITIAL_W / 2;
}

function draw() {
  background('black');

  // 아 키 코드 넣어야 작동함
  // keyisdown은 참 거짓이 아니라 키 코드를 넣어야 하는데, 그게 이진법에서 변환한 코드에서 일시적으로 a를 눌렀을때 보이는 거 확인해야함
  // a = 65, d = 68, w = 87, s = 83

  // console.log('작동하는거 맞지?');

  // ??? 왜 작동 안함 개에반데 하 버려
  // if (keyIsDown(65)) {
  //   posX = posX - move;
  //   console.log('왼쪽가는중 a');
  // }
  // if (keyIsDown(68)) {
  //   posX = posX + move;
  // }
  // if (keyIsDown(87)) {
  //   posY = posY - move;
  // }
  // if (keyIsDown(83)) {
  //   posY = posY + move;
  // }

  // ??? 왜지 아까랑 똑같은데..? 아 아래 안 고쳐서 그렇구나

  // 주기는 3초 중 2초눈 보임 나머지 1초는 멈춤
  let timeLook = frameCount % 180;
  // 뭔가 잘못된거 같지만? 아닌가?

  if (timeLook < 120) {
    posX = posX + firstX * move;
    posY = posY + firstY * move;
    // ㅇㄴ x가 가다가 멈춰야하는데, 그러면 음 값을 저장하는 곳을 만들어야 하는데? 그런다고 멈추나..? 아 값을 그냥 if else로 돌리고 안 넣으면 그만...이였던것..

    // 이게 문제인거 같은데, 일단 나중에 고치고, 바부터 만들어야..
    fill('lightgreen');
    // barX;
    noStroke();
    textFont('Boldonse');
    textAlign(CENTER);
    textSize(60);
    text('Eating', INITIAL_W / 2, INITIAL_H / 2);
    console.log(timeLook);
  } else if (size > 0) {
    background('#ddaaaaff');
    size = size - 0.1;
    barX = barX - barX / size / 5;

    noStroke();
    fill('red');
    textAlign(CENTER);

    textSize(random(50, 80));
    text('Hungry', INITIAL_W / 2, INITIAL_H / 2);
  } else if (size === 0) {
    textSize(60);
    noStroke();
    fill('red');
    text('Try again', INITIAL_W / 2, INITIAL_H / 2);
  }
  // if (size > 0) {
  //   size = size - 0.1;
  // } else if ((size = 0)) {
  //   text('Try again', INITIAL_W / 2, INITIAL_H / 2);
  // }

  barPosX = INITIAL_W / 4;
  barPosY = INITIAL_H / 10;
  barY = INITIAL_H / 45;
  // rectMode(CENTER);
  fill('rgb(0, 255, 13)');
  bar = rect(barPosX, barPosY, barX, barY, barRound);

  push();
  translate(posX, posY);
  // 애 왜 ㅋㅋㅋㅋ 50 설정인거지? 이상하네
  scale(size / 50);
  fill(randomColour);
  beginShape();
  vertex(0, 0);
  curveVertex(20, 30);
  curveVertex(12, 50);
  curveVertex(-12, 50);
  curveVertex(-20, 30);
  curveVertex(0, 0);
  vertex(20, 30);
  endShape(CLOSE);
  // 기존 코드 혹시 모르니깐
  // circle(posX, posY, size);
  pop();

  // 벽에 부딪히면 옆에서 나오는 코드
  //  x가 0일때 너비 끝에서 얘가 나옴

  if (posX < 0) {
    posX = INITIAL_W;
    console.log(posX);
  } else if (posX > INITIAL_W) {
    posX = 0;
    console.log(posX);
  } else if (posY > INITIAL_H) {
    posY = 0;
    console.log(posY);
  } else if (posY < 0) {
    posY = INITIAL_H;
    console.log(posY);
  }
}

// ㅇㄴ 한영키 때문이였어;;

// keyPressed는 키가 눌렸을때?
// keyIsDown은 키가 눌렸는가?를 보는거라 keyPressed보다 더 부드럽게 움직임 근데 작동 안해서 그냥 버림 ㅇㅇ; 뭐 그거나 그거나 ㅋ..

function keyPressed() {
  // firstX가 계속 0이니깐 안 움직이지;;
  if (key === 'a' || key === 'ㅁ') {
    firstX = -1;
    firstY = 0;
  } else if (key === 'd' || key === 'ㅇ') {
    firstX = 1;
    firstY = 0;
  } else if (key === 'w' || key === 'ㅈ') {
    firstX = 0;
    firstY = -1;
  } else if (key === 's' || key === 'ㄴ') {
    firstX = 0;
    firstY = 1;
  }
  // console.log('키 이름:', key, '키 번호', keyCode);
}
