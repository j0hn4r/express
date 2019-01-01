let img;
let spot;
let col;
let c;
let num = 5000;
let brushes = [];
let offset = 0;

function preload(){
  img = loadImage("../resources/jay.jpg")
}

function setup() {
  createCanvas(img.width,img.height)
  pixelDensity(1);
  background(100);
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 16){
    let x = i/4 % width;
    let y = (i/4 - x)/width;

    brushes.push(new brush(x,y,i))
  }

  noLoop();
}

function draw() {
  background(100);
  image(img,0,0);
  //stroke(0);
  strokeWeight(3)
  for (i in brushes){
    brushes[i].update();
    brushes[i].show();
  }
  offset += 0.01;
}

class brush {
  constructor(x,y,i) {
    this.pos1 = createVector(x,y);
    this.col = i;
    this.alpha = random(20,100);
    this.c = color(img.pixels[this.col],img.pixels[this.col+1],img.pixels[this.col+2],this.alpha);
    this.l = random(30);
    this.sw = floor(random(7));
    this.r = random(-PI/8,PI/8);
    this.getNoise();
    this.midPoint();
    this.endPoint();
  }
  getNoise(){
    this.n = noise(0.01 * this.pos1.x, 0.01 * this.pos1.y, offset) * TWO_PI;
  }
  midPoint(){
    let mx = this.pos1.x + (this.l/2 * cos(this.n+this.r));
    let my = this.pos1.y + (this.l/2 * sin(this.n+this.r));
    this.pos2 = createVector(mx,my);
  }


  endPoint(){
    let ex = this.pos1.x + (this.l * cos(this.n));
    let ey = this.pos1.y + (this.l * sin(this.n));
    this.pos3 = createVector(ex,ey);

  }
  show(){
    strokeWeight(this.sw);
    stroke(this.c);
    noFill();
    beginShape();
    curveVertex(this.pos1.x,this.pos1.y);
    curveVertex(this.pos1.x,this.pos1.y);
    curveVertex(this.pos2.x,this.pos2.y);
    curveVertex(this.pos3.x,this.pos3.y);
    curveVertex(this.pos3.x,this.pos3.y);
    endShape();
  }
  update(){
    this.getNoise();
    this.midPoint();
    this.endPoint();
  }
}
