class Ball{
  constructor(x,y){
    this.r = 6;
    this.x = x;
    this.y = y-this.r-1;
    this.speed = 10;
    this.a = random(PI/4,3*PI/4);
    this.vx = this.speed*cos(this.a);
    this.vy = -this.speed*sin(this.a);
  }

  hitsBar(bar){
  	if(this.y+this.r>=height-bar.h && this.x>bar.x-bar.w/2 && this.x<bar.x+bar.w/2){
      hit_sound_1.play();
      this.vy=-this.vy;
      console.log("hit");
    }
  }

  show(){
    push();
    stroke(240, 38, 95);
    fill(240, 38, 95, 100);
    ellipse(this.x, this.y, 2*this.r, 2*this.r);
    pop();
  }

  update(){
    this.x += this.vx;
    this.y += this.vy;
  }

  onScreen(){
    if(this.x-this.r<0 || this.x+this.r>width){
      hit_sound_2.play();
      hit_sound_2.setVolume(.7);
      this.vx = -this.vx;
    }

    if(this.y-this.r<0) {
      hit_sound_2.play();
      hit_sound_2.setVolume(.7);
      this.vy = -this.vy;
    }
  }

  hitsGround(){
    if (this.y + this.r >= height) return true;
    return false;
  }
}