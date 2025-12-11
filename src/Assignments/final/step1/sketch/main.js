// 먼저 화면부터 resize 되게 해보기 기초부터 시작
// 시간을 활용한 무언가 만들기
// 가만히 있으면 죽는 게임, 뒤에서는 어떤 무리가 쫓아오고 닿으면 사망.
// 특정 시간에만 내 현 위치를 알 수 있음
// 내 모습이 보이지 않을때, 움직일 수 있고, 보일때는 쫓아오는 무리도 같이 스탑
// 즉, 위치를 확인할 수 있을때만 시간이 정지함

// 내가 지금 당장 필요한 값은 무엇인가?
// 일단 주인공 만들기
// 1명, 생김새, 크기, 위치, 색상
// 키는 w,a,s,d
// 색상은 랜덤으로 팔레트에 있는 색 아무거나 지정하게 함

const mainChar = 1;
// 얘는 원으로 그릴거임
let size = 20;
let posX;
let posY;

let palette = [
  '#6AECE1',
  '#360185',
  '#BB8ED0',
  '#FD7979',
  '#FFEE91',
  '#DC0000',
  '#0046FF',
];

let randomColour;

// 1. 화면을 불러야 함
const canvasContainer = document.getElementById('canvas-container');
// 변수 지정 = 문서.아이디요소 가져오기('id에 지정한 이름 호출')
let render;
// render가 되어야 하니깐 함수 미리 호출하면 좋음. 값은 아직 안 넣음

const INITIAL_W = 800;
const INITIAL_H = 600;

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
}

function draw() {
  background(0);
  // rect는 총 4개가 있어야 했지?ㅋㅋ..

  posX = INITIAL_W / 2;
  posY = INITIAL_H / 2;

  circle(posX, posY, size);
}

function keyPressed() {
  if (key === 'a') {
    posX = posX - 3;
  } else if (key === 'd') {
    posX = posX + 3;
  } else if (key === 'w') {
    posY = posY - 3;
  } else if (key === 's') {
    posY = posY + 3;
  }
}
