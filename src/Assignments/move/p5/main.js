const evaders = [];
const numEvaders = 5;
const pursuers = [];
const numPursuers = 2;
const seed = 0;

function setup() {
  createCanvas(900, 900);
  randomSeed(seed);

  for (let i = 0; i < numEvaders; i++) {
    evaders.push(
      new Evader(random(width), random(height), { colour: '#4CAF50' })
    );
  }
  for (let i = 0; i < numPursuers; i++) {
    pursuers.push(
      new Pursuer(random(width), random(height), {
        colour: '#FF5252',
        maxSpeed: 6,
      })
    );
  }
}

function draw() {
  background(0);

  for (const evader of evaders) {
    evader.evade(pursuers, 25);
    evader.separate(evaders); // <— 같은 타입끼리
    evader.update();
    evader.wrapCoordinates();
    evader.show();
  }

  for (const pursuer of pursuers) {
    pursuer.pursue(evaders, 25);
    pursuer.separate(pursuers); // <— 같은 타입끼리
    pursuer.update();
    pursuer.wrapCoordinates();
    pursuer.show();
    pursuer.showTarget();
  }
}
