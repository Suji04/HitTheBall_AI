class Bar{
  constructor(brain) {
    this.h = 10;
    this.w = 80;
    this.x = width/2;
    this.dx = 5;
    this.d = random([-1,1]);
    this.score = 0;
    this.fitness = 0;

    if (brain){
      this.brain = brain.copy();
    } 
    else{
      this.brain = new NeuralNetwork(5, 8, 1);
    }
  }

  dispose(){
    this.brain.dispose();
  }

  show(){
    stroke(81, 219, 146);
    fill(81, 219, 146, 100);
    rectMode(CENTER);
    rect(this.x, height-this.h/2, this.w, this.h);
  }

  mutate() {
    this.brain.mutate(0.1);
  }

  think(ball) {
    let inputs = [];
    inputs[0] = this.x / width;
    inputs[1] = ball.x / width;
    inputs[2] = ball.y / height; 
    inputs[3] = ball.vx / 5; 
    inputs[4] = ball.vy / 5; 
    let output = this.brain.predict(inputs);
    if(output[0]>.5) this.d=-1;
    else this.d=1;
  }

  onScreen(){
    if(this.x + this.w/2>width) this.x=width-this.w/2;
    if(this.x - this.w/2<0) this.x=this.w/2;
  }

  hitGround(ball){
    if(ball.x + ball.r/2>=height) return true;
    return false;
  }

  update() {
    this.score++;
    this.x+=this.d*this.dx;
  }
}
