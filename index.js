var devicePort = process.argv[2]
var baudRate = Number(process.argv[3])

if( devicePort === undefined || baudRate === 0) {
		console.log('Usage: node index.js <device id | COM id> <baud rate>')
		process.exit()
}

const express = require('express')
const serialport = require('serialport')
const bodyParser = require('body-parser')
const serialListener = require('./libs/ws-serial.js')

const app = express()

app.set('view engine','ejs')

app.use('/public',express.static('public'))

app.get('/', (req, res)=>{
	serialListener.start(devicePort, baudRate);
	res.render('index')
})



app.listen(8000,(err)=>{
	if(err)
		throw err
	console.log('Go to http://localhost:8000 to access the portal')
})
