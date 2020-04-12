const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = process.env.SERIAL_PORT || '/dev/ttyUSB0';
const usb = new SerialPort(port);

class Thermostat {
    constructor(initialState) {
        this.sending = false;
        this.lastReq = null;
        this.setState(initialState || {});

        const parser = usb.pipe(new Readline());
        parser.on('data', this.serialHandler(this));
    }

    setTemp(temp) {
        if (!this.sending) {
            this.sending = true;
            this.lastReq = temp;
            usb.write(`;setTemp:${temp}`, () => {
                usb.drain(() => {
                    this.sending = false;
                });
            });
        }
    }

    setState(newState) {
        this.state = {
            ...this.getState(),
            ...newState,
        };
        this.emitState();
    }

    getState() {
        return this.state;
    }

    subscribe(socket) {
        this.socket = socket;
    }

    emitState() {
        if (this.socket) {
            this.socket.emit('temp_data', this.getState());
        }
    }

    serialHandler(self) {
        return data => {
            try {
                if (data.trim() === 'HTU21D Found') {
                    console.log(data);
                } else if (data.trim() === 'Unrecognized request') {
                    if (self.lastReq) {
                        self.setTemp(self.lastReq);
                    } else {
                        console.warn(data);
                    }
                } else {
                    self.setState(JSON.parse(data));
                }
            } catch (err) {
                console.log(data);
                console.error(err);
            }
        }
    }
}

module.exports = new Thermostat();