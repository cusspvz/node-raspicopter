document.addEventListener('DOMContentLoaded',function(){
	// System start
	var socket = io.connect('http://localhost/');
	var gamepad = {
		connected: false,
		configured: false,
	};
	var elems = {
		remote_video: document.getElementById('remote_video'),
		status: document.getElementById('status'),
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