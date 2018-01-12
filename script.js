

const FRAMERATE = 40;
const END = 300;
const AFF_LIM = 3;
const TIME = 0.006;
const GRAV_C = TIME * 0.09;

var COLOR_LIST;
var FLOOR;
var GRAV;
var CENTER;

var plist;
var curColor;
var distLimit;
var sizeLimit;
var isHatred;
var isBound;
var isLine;
var count;
var life;
var isAllowMurder;

function setup() {
  var html = document.getElementsByTagName('html')[0];
  createCanvas(html.clientWidth, html.clientHeight);
  frameRate(FRAMERATE);

  GRAV = createVector(0, GRAV_C);
  CENTER = createVector(width/2, height/2);
  FLOOR = createVector(0, height);
  COLOR_LIST = [
    color(212, 44, 92),
    color(12, 110, 96),
    color(72, 88, 234)
  ];

  curColor = 0;
  distLimit = 120;
  sizeLimit = 40;
  isHatred = true;
  isBound = false;
  isLine = false;
  count = 300;
  life = 10;
  isAllowMurder = false;

  plist = new PointList();
  seed(300);
}


function draw() {
  setUI();
  if(frameCount < FRAMERATE * END) {
    background(255, life);
    plist.run();
  }
}

function seed(n) {
  for(var i = 0; i<n; ++i) {
    var pv = createVector(
      Math.floor(Math.random()*width),
      Math.floor(Math.random()*width)
    );
    var vv = createVector(
      Math.floor(Math.random()*width),
      Math.floor(Math.random()*width)
    );
    var col = COLOR_LIST[Math.floor(Math.random()*COLOR_LIST.length)];
    var p = new Point(pv, vv, col);
    plist.add(p);
  }
}

function setUI() {
  fill(120);
  strokeWeight(0);
  rect(0,0,width,100);
  for(var i = 0; i< 3; i++) {
    if(i == curColor) {
      fill(COLOR_LIST[i]);
      rect(i * 100, 0, 100, 80);
      fill(0);
      rect(i * 100, 80, 100, 20);
    } else {
      fill(COLOR_LIST[i]);
      rect(i * 100, 0, 100, 100);
    }
  }

  fill(220);  //Distance increase
  rect(300,0,100,50);
  fill(0);
  text('('+ (distLimit) +')' + '\n-------------\nDist up',320,0,100,50);
  fill(255); //Distance decrease
  rect(300,50,100,50);
  fill(0);
  text('Dist down',320,70,100,50);


  fill(255);
  rect(400,0,100,50); //size increase
  fill(0);
  text('('+ (sizeLimit) +')' + '\n-------------\nSize up',420,0,100,50);
  fill(220);
  rect(400,50,100,50); //size decrease
  fill(0);
  text('Size down',420,70,100,50);


  /* HATE */
  if(isHatred) {
    fill(0);
    rect(500,0,100,100);
    fill(255);
    text('Hate is on', 510,40,90,60);
  } else {
    fill(255);
    rect(500,0,100,100);
    fill(0);
    text('Hate is off', 510,40,90,60);

  }

  /* is line on */
  if(isLine) {
    fill(0);
    rect(600,0,100,100);
    fill(255);
    text('line is on', 610,40,90,60);
  } else {
    fill(255);
    rect(600,0,100,100);
    fill(0);
    text('line is off', 610,40,90,60);
  }

  /* max count */
  fill(255);
  rect(700,0,100,50); //size increase
  fill(0);
  text('('+ (count) +')' + '\n-------------\ninc max count',720,0,100,50);
  fill(220);
  rect(700,50,100,50); //size decrease
  fill(0);
  text('dec max count',720,70,100,50);

  /* life count */
  fill(220);
  rect(800,0,100,50); //size increase
  fill(0);
  text('('+ (life) +')' + '\n-------------\n add death',820,0,100,50);
  fill(255);
  rect(800,50,100,50); //size decrease
  fill(0);
  text('add life',820,70,100,50);

  /* is bound on */
  if(isBound) {
    fill(0);
    rect(900,0,100,100);
    fill(255);
    text('friend is on', 910,40,90,60);
  } else {
    fill(255);
    rect(900,0,100,100);
    fill(0);
    text('friend is off', 910,40,90,60);
  }


}

function mouseClicked() {
  if(mouseX <100 && mouseY <100) {
    curColor = 0;
  } else if(mouseX <200 && mouseY <100) {
    curColor = 1;
  } else if(mouseX <300 && mouseY <100) {
    curColor = 2;
  } else if(mouseX <400 && mouseY <50) {
    distLimit+=3;
  } else if(mouseX <400 && mouseY <100) {
    distLimit-=3;
  } else if(mouseX <500 && mouseY <50) {
    sizeLimit+=3;
  } else if(mouseX <500 && mouseY <100) {
    sizeLimit-=3;
  } else if(mouseX <600 && mouseY <100) {
    isHatred = !isHatred;
  } else if(mouseX <700 && mouseY <100) {
    isLine = !isLine;
  } else if(mouseX <800 && mouseY <50) {
    count+=3;
  } else if(mouseX <800 && mouseY <100) {
    count-=3;
  } else if(mouseX <900 && mouseY <50) {
    life+=2;
  } else if(mouseX <900 && mouseY <100) {
    life-=2;
  } else if(mouseX <1000 && mouseY <100) {
    isBound = !isBound;
  } else {
    var pv = createVector(mouseX, mouseY);
    var vv = createVector(0, 0);

    // var i = Math.floor(Math.random() * COLOR_LIST.length);
    var col = COLOR_LIST[curColor];

    var p = new Point(pv, vv, col);
    plist.add(p);
  }

}

var PointList = function (n) {
  this.plist = [];
}

PointList.prototype.add = function(p) {
  this.plist.push(p);
}

PointList.prototype.shift = function (n) {
  while(n-- > 0) {
    this.plist.shift();
  }
}

PointList.prototype.run = function() {
  //check point count before run and shift if necessary
  this.shift(this.plist.length - count);
  //check lines draw lines
  this.check();
  //run points
  for(var i = 0; i< this.plist.length; i++) {
    this.plist[i].run(this);
  }
}

PointList.prototype.remove = function (i) {
  this.plist.splice(i, 1);
}

PointList.prototype.check = function () {
  var p1;
  var p2;
  var pushMax = TIME * 80;
  var col;
  var addPow = 0;
  for(var i = 0; i< this.plist.length; i++) {
    p1 = this.plist[i];
    for(var j = i; j<this.plist.length; j++) {
      p2 = this.plist[j];
      // in effect zone
      if(p1.p.dist(p2.p) < distLimit && p1.p.dist(p2.p) > 1) {
        //draw line between
        col = color(
          (p1.col.levels[0] + p2.col.levels[0]) / 2,
          (p1.col.levels[1] + p2.col.levels[1]) / 2,
          (p1.col.levels[2] + p2.col.levels[2]) / 2
        );
        stroke(col);
        strokeWeight(1);
        if(isLine) {
          line(p1.p.x, p1.p.y, p2.p.x, p2.p.y);
        }

        //pushes each other if colors are different;
        var pushEffect = p5.Vector.sub(p1.p, p2.p).setMag(pushMax);
        //give strength;
        if(p1.col === p2.col) {
          addPow++;
        }

        if(isHatred) {
          if(p1.col !== p2.col) {
            p1.acc.add(pushEffect);
            p2.acc.add(pushEffect.mult(-1));
            if(isAllowMurder) {
              if(p1.pow > p2.pow) {
                p2.life--;
              } else {
                p1.life--;
              }
            }
          }
        }
        if(!isHatred && isBound){
          if(p1.col === p2.col) {
            p1.acc.add(pushEffect.mult(-1));
            p2.acc.add(pushEffect);
          }
        }

        if(!isHatred && !isBound){
          if(p1.col === p2.col) {
            p1.acc.add(pushEffect);
            p2.acc.add(pushEffect.mult(-1));
          }
        }

      }
    }
  }
}

var Point = function (pv, vv, col) {
  this.p = pv.copy();
  this.acc = createVector(TIME * 0 , -TIME * 0);
  this.vel = vv.copy();
  this.col = col;
  this.life = 255;
  this.pow = 10;
}

Point.prototype.update = function (p) {

  if(this.life < 10) {
    p.remove(p.plist.indexOf(this));
  }
  var accMax = TIME * 400;
  var noiseMax = TIME * 200;
  var velLimit = TIME * 400;
  var noise = p5.Vector.random2D().setMag(noiseMax);
  this.acc.add(noise).setMag(accMax);
  this.vel.add(this.acc).setMag(velLimit);
  this.p.add(this.vel);
  this.life-=0.1;

  // if(this.p.dist(CENTER) > 100) {
  //   this.vel.mult(-1);
  // }

  if(height - this.p.y <= 30) {
    this.p.y = height - 30;
  } else if(this.p.y <= 140) {
    this.p.y = 140;
  }
  if(width - this.p.x <= 30) {
    this.p.x = width - 30;
  } else if(this.p.x <= 30) {
    this.p.x = 30;
  }
}


Point.prototype.draw = function () {
  // this.col.setAlpha(this.life);
  stroke(this.col);
  strokeWeight(sizeLimit);
  point(this.p.x, this.p.y);
}


Point.prototype.run = function (plist) {
  this.update(plist);
  this.draw();
}
