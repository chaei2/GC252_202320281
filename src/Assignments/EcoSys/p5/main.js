// 추격자가 도망자를 잡으면 화면에서 사라지게 하기
const evaders = [];
const numEvaders = 4;
const pursuers = [];
const numPursuers = 2;
// const seed = 0;

const BREEDING_COOLDOWN_FRAMES = 240;
let lastBreedingFrame = 0;
const EVADER_PALETTE = ['#FFF2C6', '#FFC400', '#001BB7', '#8CA9FF', '#FF3F7F'];

// 캔버스에 관하여
const canvasContainer = document.getElementById('canvas-container');

const INITIAL_WIDTH = 1000;
const INITIAL_HEIGHT = 1000;

let renderer;

function resizeHandler(entries) {
  for (let entry of entries) {
    const { width: containerWidth, height: containerHeight } =
      entry.contentRect;

    const aspect = INITIAL_WIDTH / INITIAL_HEIGHT;

    let newWidth = containerWidth;
    let newHeight = newWidth / aspect;
    if (newHeight > containerHeight) {
      newHeight = containerHeight;
      newWidth = newHeight * aspect;
    }
    resizeCanvas(Math.floor(newWidth), Math.floor(newHeight));
  }
}

function setup() {
  renderer = createCanvas(INITIAL_WIDTH, INITIAL_HEIGHT);
  renderer.parent(canvasContainer);

  canvasContainer.style.aspectRatio = `${INITIAL_WIDTH} / ${INITIAL_HEIGHT}`;

  // 캔버스가 사이즈 재 설정되는걸 관측함
  const resizeObserver = new ResizeObserver(resizeHandler);
  resizeObserver.observe(canvasContainer);

  // randomSeed(seed);

  for (let n = 0; n < numEvaders; n++) {
    evaders.push(new Evader(random(width), random(height)));
  }
  for (let n = 0; n < numPursuers; n++) {
    pursuers.push(new Pursuer(random(width), random(height)));
  }
}

function draw() {
  background('#8CE4FF');

  // 도망자 정보 저장
  const newEvaders = [];

  const canBreed = frameCount > lastBreedingFrame + BREEDING_COOLDOWN_FRAMES;

  for (let cnt = evaders.length - 1; cnt >= 0; cnt--) {
    const evader = evaders[cnt];

    const separationDistance = evader.r * 2;
    let caught = false;

    // 충돌했을때
    for (let n = 0; n < cnt; n++) {
      const otherEvader = evaders[n];
      const distance = evader.pos.dist(otherEvader.pos);

      if (distance < separationDistance) {
        if (canBreed) {
          const spawnPos = p5.Vector.lerp(evader.pos, otherEvader.pos, 0.5);
          const offset = p5.Vector.random2D();

          offset.mult(evader.r * 1.5);

          const newX = spawnPos.x + offset.x;
          const newY = spawnPos.y + offset.y;

          const randomColor = random(EVADER_PALETTE);

          newEvaders.push(
            new Evader(newX, newY, { colour: randomColor, r: 5 })
          );

          // 번식 성공 시, 타이머 리셋임
          lastBreedingFrame = frameCount;
        }
        break;
      }
    }

    // 충돌 감지및 제거
    for (const pursuer of pursuers) {
      // 충돌 거리 설정(도망자랑 추격자의 반지름 합을 한건데 왜 잘 안 부딪히는거 같지..)
      const caputureDistance = evader.r + pursuer.r;
      const effectiveCaptureDistance = caputureDistance * 0.5;
      const distance = evader.pos.dist(pursuer.pos);
      if (distance < effectiveCaptureDistance) {
        evaders.splice(cnt, 1);
        caught = true;
        break;
      }
    }

    if (!caught) {
      evader.update();
      evader.evade(pursuers);
      evader.separate(evaders);
      evader.wrapCoordinates();
      evader.show();
    }
  }

  evaders.push(...newEvaders);

  for (const pursuer of pursuers) {
    pursuer.update();
    pursuer.pursue(evaders);
    pursuer.separate(pursuers);
    pursuer.wrapCoordinates();
    pursuer.show();
    pursuer.showTarget();
  }
}
