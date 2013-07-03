document.addEventListener('DOMContentLoaded',function(){

	// System start
	
	var socket = io.connect('http://localhost/');
	var gamepad = {
		connected: false,
		configured: false,
	};
	var elems = {
		remote_video: document.getElementById('remote_video'),
		gamepad_status: document.getElementById('gamepad_status'),
		socket_status: document.getElementById('gamepad_status'),
	};

	var controls = {
		aileron: 0,
		elevator: 0,
		throttle: 50,
		rudder: 0,
	};

	elems.gamepad_status.innerHTML = 'Not connected...';
	elems.socket_status.innerHTML = 'Not connected...';

	gamepadSupport.init();

	//////////////////////////////////////////////

	// Main App
	socket.on('connect', function(){
		elems.socket_status.innerHTML = 'Socket Connected!';

		socket.on('event', function(data){
			console.log(data);
		});

		socket.emit('controls',{
			test: 'teste'
		});

		socket.on('disconnect', function(){
			console.log('disconnected');
		});
	});

});