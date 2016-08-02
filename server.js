var serialport = require('serialport'),
    SerialPort = serialport.SerialPort,
    port = new SerialPort(
        '/dev/tty.usbserial-DN00OO8D',
        {
            parser: serialport.parsers.readline('\n')
        }
    ),
    tempInfo = {},
    express = require('express'),
    app = express();

// Listen for data on the serial port
port.on('data', (data) => {
    try {
        tempInfo = JSON.parse(data);
    } catch(err) {
        // Opening the port will output some initialization text we don't care about
    }
});

app.use(express.static('public'));

// Front page of the app
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

// Endpoint for retrieving temperature/humidity data
app.get('/getinfo', (req, res) => {
    port.write('getInfo', (err) => {
        res.send(tempInfo);
    });
});

app.listen(3000, () => {
    console.log('ThermoControl listening on port 3000!');
});
