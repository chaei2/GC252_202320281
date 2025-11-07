// matter.js는 사각형 그리는 기본 셋팅이 가운데임

// 엔진 = 계산, 렌더 = 그림, 월드 = 공간, 러너 = 시간

// 월드에 해당되는건 Composite임
const elem = document.querySelector('#matter-box');
//  querySelector는 값이 하나 밖에 없음
console.log(elem);
// module aliases
// let Engine = Matter.Engine,
//   Render = Matter.Render,
//   Runner = Matter.Runner,
//   Bodies = Matter.Bodies,
//   // 색의 공간
//   Composite = Matter.Composite;

// 리엑트로 해야함

//Engine: mEngine으로 쓰면 이름이 같은 이름 다르게 할 수있ㄹ음 모듈은 관습적으로
const { Engine, Render, Runner, Bodies, Composite } = Matter;

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
  element: elem,
  engine: engine,

  // 필드 이름이랑 같은 경우 같음
});

// create two boxes and a ground
const boxA = Bodies.rectangle(400, 200, 80, 80);
const boxB = Bodies.rectangle(450, 50, 80, 80);
const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
// 무조건 engine.world,넣어야함
Composite.add(engine.world, [boxA, boxB, ground]);

// run the renderer
Render.run(render);

// 시간이 흐르도록하는것 runner
// runner가 없으면 시간이 얼어버림
// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);
