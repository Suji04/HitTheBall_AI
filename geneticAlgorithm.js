function nextGeneration() {
  console.log('next generation');
  gen++;
  maxScore=0;
  calculateFitness();
  for (let i = 0; i < TOTAL; i++) {
    bars[i] = pickOne();
    balls[i] = new Ball(bars[i].x, height-bars[i].h);
  }
  for (let i = 0; i < TOTAL; i++) {
    savedBars[i].dispose();
  }
  savedBars = [];
}

function pickOne() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - savedBars[index].fitness;
    index++;
  }
  index--;
  let bar = savedBars[index];
  let child = new Bar(bar.brain);
  child.mutate();
  return child;
}

function calculateFitness() {
  let sum = 0;
  for (let bar of savedBars) {
    sum += bar.score;
  }
  for (let bar of savedBars) {
    bar.fitness = bar.score / sum;
  }
}
