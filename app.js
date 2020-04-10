const Hapi = require('@hapi/hapi');
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = process.env.SERIAL_PORT || '/dev/ttyUSB0';
const SocketIo = require('socket.io');
let sending = false;
let lastReq;

class State {
    constructor (initialState) {
        this.setState(initialState || {});
    }
    setState (newState) {
        this.state = {
          ...this.getState(),
          ...newState,
        };
        this.emitState();
    }
    getState () {
        return this.state;
    }
    subscribe (socket) {
        this.socket = socket;
    }
    emitState () {
        if (this.socket) {
            this.socket.emit('temp_data', this.getState());
        }
    }
}

const serialHandler = (usb, state) => data => {
    try {
        if (data.trim() === 'HTU21D Found') {
            console.log(data);
        } else if (data.trim() === 'Unrecognized request' && lastReq) {
            setTemp(usb)(lastReq);
        }else {
            state.setState(JSON.parse(data));
        }
    } catch (err) {
        console.log(data);
        console.error(err);
    }
}

const setTemp = usb => temp => {
    if (!sending) {
        sending = true;
        lastReq = temp;
        usb.write(`;setTemp:${temp}`, () => {
            usb.drain(() => {
                sending = false;
            });
        });
    }
}

async function runService () {
    try {
        const host = '0.0.0.0';
        const apiServer = Hapi.server({
            port: process.env.PORT || 3000,
            host,
            routes: {
                files: {
                    relativeTo: `${__dirname}/public`
                }
            }
        });
        const wsServer = Hapi.server({
            port: process.env.WS_PORT || 3001,
            host
        });
        const state = new State();
        
        await apiServer.register(require('@hapi/inert'));

        apiServer.route({
            method: "GET",
            path: "/{param*}",
            handler: {
                directory: {
                    path: ".",
                    redirectToSlash: true,
                },
            },
        });

        const usb = new SerialPort(port);
        const parser = usb.pipe(new Readline());
        parser.on('data', serialHandler(usb, state));

        const io = SocketIo(wsServer.listener,);
        state.subscribe(io.sockets);
        io.on("connection", socket => {
            socket.on('setTemp', setTemp(usb));
        });

        await apiServer.start();
        await wsServer.start();

        console.info(`Server running at ${apiServer.info.uri}`);
    } catch (err) {
        console.error(err);
        stopService(1);
    }
}

async function stopService(exitCode) {
    process.exit(exitCode);
}

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down...');
    stopService(0);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down...');
    stopService(0);
});

process.on('unhandledRejection', err => {
    console.error(err);
    stopService(1);
});

process.on('uncaughtException', err => {
    console.error(err);
    stopService(1);
});

runService();