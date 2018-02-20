const WebSocketServer = require('ws').Server
const serialport = require('serialport')

const wss = new WebSocketServer({
		port:40110
})

wss.start = (devicePort,baudRate)=>{
	
	console.log('WebSocket started at localhost:40110')
	
	wss.on('connection',function(ws){
		
		console.log('Got an incoming connection')
		
		ws.send('Initiating Serial Connection...')
		
			var port = new serialport(String(devicePort),{
				baudRate:Number(baudRate)
			})
	
			port.on('open',()=>{
				ws.send('Serial Communication established: '+devicePort)
			})
	
			port.on('error',(err)=>{
				console.log(err)
				ws.send('Error in device connection')
				ws.send('Restart the server')
				console.log('Restart the server')
				process.exit()
			})
			
			port.on('data',(data)=>{
				ws.send(String(data))
			})
		
	})
}

module.exports = wss
