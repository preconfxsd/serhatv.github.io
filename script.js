

const FRAMERATE = 60;
const END = 30;
const AFF_LIM = 3;
const TIME = 0.004;
const GRAV_C = TIME * 0.09;

var COLOR_LIST;
var FLOOR;
var GRAV;
var CENTER;

var plist;
function setup() {
  createCanvas(600, 600);
  frameRate(FRAMERATE);

  GRAV = createVector(0, GRAV_C);
  CENTER = createVector(width/2, height/2);
  FLOOR = createVector(0, height);
  COLOR_LIST = [
    color(212, 44, 92),
    color(12, 210, 96),
    color(72, 88, 234),
    color(102, 164, 24),
    color(78, 188, 12),
    color(48, 68, 210),
    color(12, 100, 234),
    color(220, 54, 84)
  ];

  var pv = CENTER.copy();
  var vv = createVector(TIME *100, -TIME * 100);
  var p1 = new Point(pv, vv, COLOR_LIST[0]);

  plist = new PointList();
  plist.add(p1);
}


function draw() {
  if(frameCount < FRAMERATE * END) {
    background(237, 247, 248, 10);
    plist.run();
  }
}

function mouseClicked() {
  var pv = createVector(mouseX, mouseY);
  var vv = createVector(TIME*100, -TIME * 100);

  var i = Math.floor(Math.random() * COLOR_LIST.length);
  var col = COLOR_LIST[i];

  var p = new Point(pv, vv, col);
  plist.add(p);
}

var PointList = function (n) {
  this.plist = [];
  this.max = 20;
}

PointList.prototype.add = function(p) {
  if(this.plist.length > this.max) {
    this.plist.shift();
  }
  this.plist.push(p);

}

PointList.prototype.run = function() {
  this.check();
  for(var i = 0; i< this.plist.length; i++) {
    this.plist[i].run();
  }
}

PointList.prototype.check = function () {
  var p1;
  var p2; // temporary Point object
  var limit = 200;
  var pushLimit = 1000;
  var col;
  for(var i = 0; i< this.plist.length; i++) {
    p1 = this.plist[i];
    for(var j = i; j<this.plist.length; j++) {
      p2 = this.plist[j];
      // in effect zone
      if(p1.p.dist(p2.p) < limit && p1.p.dist(p2.p) > 1) {
        //draw line between
        col = color(
          (p1.col.levels[0] + p2.col.levels[0]) / 2,
          (p1.col.levels[1] + p2.col.levels[1]) / 2,
          (p1.col.levels[2] + p2.col.levels[2]) / 2
        );
        stroke(col);
        strokeWeight(4);
        line(p1.p.x, p1.p.y, p2.p.x, p2.p.y);

        //pushes each other;
        var effect = p5.Vector.sub(p1.p, p2.p).setMag(0.01);
        p1.acc.add(effect);
        p2.acc.add(effect.mult(-1));

      }
    }
  }

}

var Point = function (pv, vv, col) {
  this.p = pv.copy();
  this.acc = createVector(TIME * 10 , -TIME * 10);
  this.vel = vv.copy();
  this.col = col;
}

Point.prototype.update = function () {
  var distLimit = 300;
  var noiseLimit = 100;
  var velLimit = TIME * 500;
  var noise = p5.Vector.random2D().mult(1/noiseLimit);
  this.acc.add(noise).setMag(0.1);
  this.vel.add(this.acc).setMag(velLimit);
  this.p.add(this.vel);

  // if(this.p.dist(CENTER) > 100) {
  //   this.vel.mult(-1);
  // }

  if(height - this.p.y <=10 || this.p.y <= 10) {
    this.p.y = (height - this.p.y);
  }
  if(width - this.p.x <=10 || this.p.x <= 10) {
    this.p.x = (width - this.p.x);
  }
}


Point.prototype.draw = function () {
  var i = Math.floor(Math.random() * COLOR_LIST.length);
  stroke(this.col);
  strokeWeight(40);
  point(this.p.x, this.p.y);
}


Point.prototype.run = function () {
  this.update();
  this.draw();
}
