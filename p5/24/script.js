var canvasDiameter = 800;

var lineGap = 20;
var lineLength = lineGap - 8;
var lines = [];
var margin = 200;

var img;

//perlin noise
var yoff = 0.0;
var xoff = 0.0;

var corner;

function preload() {
	img = loadImage("bg.png"); 
}

function setup() {
	createCanvas(canvasDiameter, canvasDiameter);

	for (var i=margin + (lineGap % canvasDiameter) / 2; i<canvasDiameter-margin; i+=lineGap) {
		tempLine = [];
		for (var j=margin + (lineGap % canvasDiameter) / 2; j<canvasDiameter-margin; j+=lineGap) {
			var currPoint = new p5.Vector(i, j);
			tempLine.push(currPoint);
		}
		lines.push(tempLine);
	}
	strokeWeight(3);
	noFill();
	stroke("#15d8f2");
	corner = new p5.Vector(margin, canvasDiameter-margin);
}

function draw() {
	image(img, 0, 0, 800, 800);
	strokeWeight(3);
	noFill();
	for (var i=0; i<lines.length; i++) {
		var currXOff = xoff + i/10;
		for (var j=0; j<lines[i].length; j++) {
			var currPoint = lines[i][j];
			var theta = sin(currPoint.dist(corner) / (lineGap*3) - frameCount/32);
			push();
				translate(currPoint.x, currPoint.y);
				rotate(theta);
				//rotate(-frameCount/128);
				line(-lineLength/2, 0, lineLength/2, 0);
			pop();
			yoff += 0.00001;
		}
	}
}

function calcVec(x, y) {
	return new p5.Vector(y - x, -x - y);
}

function getColor(a) {
	b = map(a.dist(eye), 0, 200, 0, 1)
	stroke(lerpColor(from, to, b));
}
