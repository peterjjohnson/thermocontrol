const express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    broadcastPort = process.env.PORT || 3000

app.use(express.static(`${__dirname}/public`))

// Front page of the app
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

try {
    const SerialPort = require('serialport'),
        Readline = SerialPort.parsers.Readline,
        port = new SerialPort('/dev/ttyUSB0'),// iMac: '/dev/tty.usbserial-DN00OO8D'),
        parser = port.pipe(new Readline())
    let last_req, sending = false, init = true

    // Set the hold temperature
    const setTemp = temp => {
        if (!sending) {
            sending = true
            last_req = temp
            // Send the setTemp request to the Arduino
            port.write(';setTemp:' + temp, () => {
                port.drain(() => {
                    sending = false
                })
            })
        }
    }

    // Connect socket.io
    io.on('connection', socket => {

        // When we receive JSON data from the thermostat, emit it to connected clients
        parser.on('data', data => {
            if (data) {
                try {
                    if (data == 'Unrecognized request' && !init) setTemp(last_req)
                    else socket.emit('temp_data', JSON.parse(data))
                } catch (err) {
                    console.log(err)
                }
            }
        })

        // incrementTemp event - send command to thermostat to increase hold temperature
        socket.on('setTemp', setTemp)
    })

    init = false
} catch (err) {
    console.log('Unable to connect to thermostat!')
    console.error(err)
}

// Start up the server
server.listen(broadcastPort, () => {
    console.log(`ThermoControl listening on port ${broadcastPort}!`)
})
