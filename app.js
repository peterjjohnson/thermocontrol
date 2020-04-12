const Hapi = require('@hapi/hapi');
const SocketIo = require('socket.io');
const Thermostat = require('./lib/thermostat');

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
        const io = SocketIo(wsServer.listener);

        Thermostat.subscribe(io.sockets);

        io.on("connection", socket => {
            socket.on('setTemp', Thermostat.setTemp);
        });
        
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

        await apiServer.start();
        await wsServer.start();

        console.info(`Web server running at ${apiServer.info.uri}:${apiServer.info.port}`);
        console.info(`Socket server running at ${wsServer.info.uri}:${wsServer.info.port}`);
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