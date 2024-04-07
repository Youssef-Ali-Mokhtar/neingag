let io;

module.exports = {
    init: httpServer=> {
            io = require('socket.io')(httpServer, {
            cors: {
                origin: "http://localhost:3000"
            }
        });
        return io;
    },
    getIo: ()=> {
        if(!io) {
            throw new Error('Socket io not initialized');
        }
        return io;
    }
}

// const io = socketIo(server, {
//     cors: {
//         origin: "http://localhost:3000"
//     }
// });