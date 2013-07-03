window.requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;
var gamepad = null;
var socket = io.connect('http://'+document.location.host+'/');
var controls = {
	aileron: 0,
	elevator: 0,
	throttle: 50,
	rudder: 0,
};
var updateVars = function(){

	if(gamepad !== null){
		if(typeof gamepad.axis[1] != 'undefined'){
			controls.throttle = parseInt( ( gamepad.axis[1] + 1 ) / 2 * 100 ) * -1 + 100;
		}
		if(typeof gamepad.axis[0] != 'undefined'){
			controls.elevator = parseInt( ( gamepad.axis[0] + 1 ) / 2 * 100 );
		}
		if(typeof gamepad.axis[2] != 'undefined'){
			controls.aileron = parseInt( ( gamepad.axis[2] + 1 ) / 2 * 100 );
		}
		if(typeof gamepad.axis[3] != 'undefined'){
			controls.rudder = parseInt( ( gamepad.axis[3] + 1 ) / 2 * 100 ) * -1 + 100;
		}
		socket.emit('controls',{
			elevator: controls.elevator,
			aileron: controls.aileron,
			throttle: controls.throttle,
			rudder: controls.rudder,
		});
	}

	setTimeout(function(){
		updateVars();
	}, 200);
};

document.addEventListener('DOMContentLoaded',function(){

	// System start
	var elems = {
		remote_video: document.getElementById('remote_video'),
		gamepad_status: document.getElementById('gamepad_status'),
		socket_status: document.getElementById('socket_status'),
	};

	elems.gamepad_status.innerHTML = 'Not connected...';
	elems.socket_status.innerHTML = 'Not connected...';

	//////////////////////////////////////////////

	//Moz section for gamepad

	function axisHandler(e) {
		gamepad.axis[e.axis] = e.value;
	}

	function gamepadConnected(e) {
		elems.gamepad_status.innerHTML = 'Gamepad Connected!';
		gamepad = {axis:{
			0:0,
			1:0,
			2:0,
			3:0
		}};
		window.addEventListener("MozGamepadAxisMove", axisHandler, false);
	}

	function buttonhandler(e){
		gamepad.button[e.button] = e.value;
	}

	window.addEventListener("MozGamepadConnected", gamepadConnected, false);
	window.addEventListener("MozGamepadButtonDown", buttonhandler, false);

	// Main App
	socket.on('connect', function(){
		elems.socket_status.innerHTML = 'Socket Connected!';

		socket.on('event', function(data){
			console.log(data);
		});

		updateVars();

		socket.on('disconnect', function(){
			console.log('disconnected');
		});
	});

});