'use strict'

const serialport = require('serialport'),
    SerialPort = serialport.SerialPort,
    port = new SerialPort(
        '/dev/tty.usbserial-DN00OO8D',
        { parser: serialport.parsers.readline('\n') }
    ),
    express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);
let last_req, sending = false;

app.use(express.static('public'));

// Front page of the app
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

// Set the hold temperature
const setTemp = temp => {
    if (!sending) {
        sending = true;
        last_req = temp;
        // Send the setTemp request to the Arduino
        port.write(';setTemp:' + temp, () => {
            port.drain(() => {
                sending = false;
            });
        });
    }
}

// Connect socket.io
io.on('connection', socket => {

    // When we receive JSON data from the thermostat, emit it to connected clients
    port.on('data', data => {
        if (data) {
            try {
                if (data == 'Unrecognized request') setTemp(last_req);
                else socket.emit('temp_data', JSON.parse(data));
            } catch (err) {
                console.log(err);
            }
        }
    });

    // incrementTemp event - send command to thermostat to increase hold temperature
    socket.on('setTemp', setTemp);
});

// Start up the server
server.listen(3000, () => {
    console.log('ThermoControl listening on port 3000!');
});
