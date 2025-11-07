// concave랑 convex 차이점
// convex 볼록한 모양()
// concave 오목한 모양(convex도형을 합쳐서 나오게 함)
const elements = document.querySelector('#matter-box');
const width = 800;
const height = 600;

const {
  Engine,
  Render,
  Runner,
  Composites,
  Common,
  MouseConstraint,
  Mouse,
  Composite,
  Bodies,
} = Matter;

// create engine
const engine = Engine.create(),
  world = engine.world;

// create renderer
const render = Render.create({
  element: elements,
  engine: engine,
  options: {
    width,
    height,
    showAngleIndicator: true,
  },
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
// Composites
// 어떤
var stack = Composites.stack(20, 20, 10, 5, 0, 0, function (x, y) {
  var sides = Math.round(Common.random(1, 8));

  // round the edges of some bodies
  // chamfer 둥근 모서리 주는 애임
  var chamfer = null;
  if (sides > 2 && Common.random() > 0.7) {
    chamfer = {
      radius: 10,
    };
  }

  switch (Math.round(Common.random(0, 1))) {
    case 0:
      if (Common.random() < 0.8) {
        return Bodies.rectangle(
          x,
          y,
          Common.random(25, 50),
          Common.random(25, 50),
          { chamfer: chamfer }
        );
      } else {
        return Bodies.rectangle(
          x,
          y,
          Common.random(80, 120),
          Common.random(25, 30),
          { chamfer: chamfer }
        );
      }
    case 1:
      return Bodies.polygon(x, y, sides, Common.random(25, 50), {
        chamfer: chamfer,
      });
  }
});

Composite.add(world, stack);

// 벽치는 용도
Composite.add(world, [
  // walls
  Bodies.rectangle(width * 0.5, 0, width, 50, { isStatic: true }),
  Bodies.rectangle(width * 0.5, height, width, 50, { isStatic: true }),
  Bodies.rectangle(width, height * 0.5, 50, height, { isStatic: true }),
  Bodies.rectangle(0, height * 0.5, 50, height, { isStatic: true }),
]);

// add mouse control
var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
// lookAt없으면 확대 축소가 안됨
Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: 800, y: 600 },
});
