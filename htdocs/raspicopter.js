document.addEventListener('DOMContentLoaded',function(){

	// System start
	gamepadSupport.init();
	var socket = io.connect('http://localhost/');
	var gamepad = {
		connected: false,
		configured: false,
	};
	var elems = {
		remote_video: document.getElementById('remote_video'),
		status: document.getElementById('status'),
	};

	var controls = {
		aileron: 0,
		elevator: 0,
		throttle: 50,
		rudder: 0,
	};

	//////////////////////////////////////////////
		
	elems.status.innerHTML = 'Connecting...';

	// Main App
	socket.on('connect', function(){
		elems.status.innerHTML = 'Connected!';

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