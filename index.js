var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var port = new SerialPort('/dev/tty.usbserial-DN00OO8D', {
    parser: serialport.parsers.readline('\n')
});
var tempInfo = {};

// Listen for data on the serial port
port.on('data', function(data) {
    try {
        tempInfo = JSON.parse(data);
    } catch(err) {
        // Opening the port will output some initialization text we don't care about
    }
});

var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

// Front page of the app
app.get('/', function(req, res) {
    res.sendFile('index.html');
});

// Endpoint for retrieving temperature/humidity data
app.get('/getinfo', function(req, res) {
    port.write('getInfo', function(err) {
        res.send(tempInfo);
    });
});

app.listen(3000, function () {
    console.log('ThermoControl listening on port 3000!');
});
