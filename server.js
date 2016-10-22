'use strict'

const serialport = require('serialport'),
    SerialPort = serialport.SerialPort,
    port = new SerialPort(
        '/dev/tty.usbserial-DN00OO8D',
        {
            parser: serialport.parsers.readline('\n')
        }
    ),
    express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

app.use(express.static('public'));

// Front page of the app
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

// Connect socket.io
io.on('connection', socket => {
    // When we recieve JSON data from the thermostat, emit it to connected clients
    port.on('data', data => {
        try {
            socket.emit( 'temp_data', JSON.parse( data ) );
        } catch (e) {
            console.log(data);
        }
    });

    // incrementTemp event - send command to thermostat to increase hold temperature
    socket.on('setTemp', temp => {
        port.write(';setTemp:' + temp);
    });
});

server.listen(3000, () => {
    console.log('ThermoControl listening on port 3000!');
});
