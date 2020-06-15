const TOTAL = 40;
let bars = [];
let savedBars = [];
let balls = [];
let counter = 0;
var slider;
let gen = 0;
let maxScore = 0;
let hit_sound_1;
let hit_sound_2;

function mousePressed() {
  userStartAudio();
}

function preload(){
    hit_sound_1 = loadSound("audio1.mp3");
    hit_sound_2 = loadSound("audio2.mp3");
}

function setup() {
  createCanvas(windowWidth/2, windowHeight);
  tf.setBackend('cpu');
  slider = createSlider(1, 10, 1);
  slider.position(3*windowWidth/4-150, 9*windowHeight/10);
  slider.addClass("slide");

  game_name = createP("Hit the Ball");
  game_name.position(3*windowWidth/4-100, windowHeight/9);
  game_name.addClass("game-name");
  for (let i = 0; i < TOTAL; i++) {
    bars[i] = new Bar();
    balls[i] = new Ball(bars[i].x, height-bars[i].h);
  }

}

function draw(){
  for (let n = 0; n < slider.value(); n++){
    for (let i = bars.length - 1; i >= 0; i--){
      bars[i].onScreen();
      balls[i].onScreen();
      
      balls[i].hitsBar(bars[i]);

      if(balls[i].hitsGround()){
        balls.splice(i,1);
        savedBars.push(bars.splice(i,1)[0]);
      }
    }
    for (var i = 0; i < bars.length; i++) {
      balls[i].update();
      bars[i].think(balls[i]);
      bars[i].update();
    }

    if (bars.length === 0) {
      counter = 0;
      nextGeneration();
    }
  }



  background(21, 22, 36);
  textSize(25);
  noStroke();
  fill(100);
  text("click anywhere for sound", width/2-150, 200);
  fill(180);
  text('max score:', 10, 30);
  text('generation:', 10, 85);

  maxScore = 0
  for(var i = 0; i < bars.length; i++){
    balls[i].show();
    bars[i].show();
    maxScore = max(maxScore, bars[i].score);
  }

  stroke(235, 189, 23);
  fill(235, 189, 23, 100);
  text(str(gen), 10, 112);
  text(str(maxScore), 10, 55);
}
