'use strict';

var Victor = require('victor');

var G = 100;
var SQUARE_RAD = 5;

var run = function() {
	var state = {
		canvas: null,
		largeBody: null,
		smallBody: null,
	};

	init(state);
	loop(state);
};

var init = function(state) {
	state.canvas = document.getElementById('canvas');
	state.largeBody = {
		pos: new Victor(0, 0),
		vel: new Victor(0, 0),
		m: 100,
	};

	var orbitRad = 300;
	var orbitVel = Math.sqrt(G * state.largeBody.m / orbitRad);
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

	var radSq = state.largeBody.pos.clone()
		.subtract(state.smallBody.pos)
		.lengthSq();
	var accelMag = G * state.largeBody.m / radSq;
	var accel = state.largeBody.pos.clone()
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

	drawOrbit(ctx, state);
	drawBody(ctx, state.largeBody);
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

var drawOrbit = function(ctx, state) {
	var rad = state.smallBody.pos.clone()
		.subtract(state.largeBody.pos)
		.length();

	ctx.strokeStyle = '#ff0000';
	ctx.beginPath();
	ctx.ellipse(0, 0, rad, rad, 0, 0, 2 * Math.PI);
	ctx.stroke();
};

window.onload = run;
