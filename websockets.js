var WSS = require('websocket').server;

var http = require('http');

var web_server = http.createServer(function(req, res){
}).listen(2345);

var websocket_server = new WSS ({
	httpServer: web_server
});

var conexiones = [];
var p1;
var p2;

websocket_server.on('request', function(req){
	console.log('PETICION!!!!!');
	//var conn = req.accept(null, req.origin);
	if ( p1 == null){
			p1 = req.accept(null, req.origin);
			
			p1.on('message', function(e){
				//if (p2 == null)
					//	return;
//				p2.send(e.utf8Data);	
				console.log(e.utf8Data);
			});

			p1.send('{"player":1}');
	}
	else if ( p2 == null){
			p2 = req.accept(null, req.origin);
			p2.on('message', function(e){
				p1.send(e.utf8Data);
			});

			p2.send('{"player":2}');

			setTimeout(function(){
					p1.send('{"start":1}');
					p2.send('{"start":1}');
					
			}, 3000);
	};
});


