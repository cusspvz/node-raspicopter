// PreLoading dependences
//var gpio = require("pi-gpio");
var express = require('express');
var app = express();
var server = require('http').createServer(app).listen(80);
var io = require('socket.io').listen(server);

////////////////////////////////////////////////
app.use(express.static(__dirname + '/htdocs'));

////////////////////////////////////////////////
io.sockets.on('connection', function (socket) {
	
	socket.on('controls',function(data){
		console.log(data);
	});

	// Disconnect Actions
	socket.on('disconnect', function () {
		// Do something to quadcopter
	});

});