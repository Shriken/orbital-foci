var G = 1;
var SQUARE_RAD = 5;

var run = function() {
	var state = {
		canvas: null,
		bigBody: null,
		smallBody: null,
	};

	init(state);
	loop(state);
};

var init = function(state) {
	state.canvas = document.getElementById('canvas');
	state.bigBody = {
		x: 0,
		y: 0,
		vx: 0,
		vy: 0,
		m: 100,
	};

	var orbitRad = 300;
	state.smallBody = {
		x: orbitRad,
		y: 0,
		vx: 0,
		vy: Math.sqrt(G * state.bigBody.m / orbitRad),
		m: 1,
	};
};

var loop = function(state) {
	update(state);
	render(state);

	setTimeout(function() { loop(state); }, 30);
};

var update = function(state) {
	state.smallBody.x += state.smallBody.vx;
	state.smallBody.y += state.smallBody.vy;
};

var render = function(state) {
	var canvas = state.canvas;
	var ctx = canvas.getContext('2d');
	ctx.save();

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.fillStyle = '#ff0000';
	ctx.fillRect(
		state.bigBody.x - SQUARE_RAD,
		state.bigBody.y - SQUARE_RAD,
		SQUARE_RAD * 2,
		SQUARE_RAD * 2
	);
	ctx.fillRect(
		state.smallBody.x - SQUARE_RAD,
		state.smallBody.y - SQUARE_RAD,
		SQUARE_RAD * 2,
		SQUARE_RAD * 2
	);

	ctx.restore();
};

window.onload = run;
