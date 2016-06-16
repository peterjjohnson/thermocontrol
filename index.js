var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var port = new SerialPort('/dev/tty.usbserial-DN00OO8D', {
    parser: serialport.parsers.readline('\n')
});
var tempInfo = {};

port.on('data', function(data) {
    try {
        tempInfo = JSON.parse(data);
    } catch(err) {
        // Opening the port will output some non-JSON text we don't care about
    }
});

var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile('index.html');
});

app.get('/getinfo', function(req, res) {
    port.write('getInfo', function(err) {
        res.send(tempInfo);
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
