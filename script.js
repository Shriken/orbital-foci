'use strict';

var Victor = require('victor');

var G = 100;
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
		pos: new Victor(0, 0),
		vel: new Victor(0, 0),
		m: 100,
	};

	var orbitRad = 300;
	var orbitVel = Math.sqrt(G * state.bigBody.m / orbitRad);
	state.smallBody = {
		pos: new Victor(orbitRad, 0),
		vel: new Victor(0, orbitVel),
		m: 1,
	};
};

var loop = function(state) {
	update(state);
	render(state);

	setTimeout(() => loop(state), 30);
};

var update = function(state) {
	state.smallBody.pos.add(state.smallBody.vel);

	var radSq = state.bigBody.pos.clone()
		.subtract(state.smallBody.pos)
		.lengthSq();
	var accelMag = G * state.bigBody.m / radSq;
	var accel = state.bigBody.pos.clone()
		.subtract(state.smallBody.pos)
		.normalize()
		.multiply(new Victor(accelMag, accelMag));

	state.smallBody.vel.add(accel);
};

var render = function(state) {
	var canvas = state.canvas;
	var ctx = canvas.getContext('2d');
	ctx.save();

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.translate(canvas.width / 2, canvas.height / 2);

	drawBody(ctx, state.bigBody);
	drawBody(ctx, state.smallBody);

	ctx.restore();
};

var drawBody = function(ctx, body) {
	ctx.fillStyle = '#ff0000';
	ctx.fillRect(
		body.pos.x - SQUARE_RAD,
		body.pos.y - SQUARE_RAD,
		SQUARE_RAD * 2,
		SQUARE_RAD * 2
	);
};

window.onload = run;
