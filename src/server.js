    const http =require('http')
    const PORT= 8082
    const app =require('./app')
    require('dotenv').config();
    const socketio = require('socket.io')
    const server = http.createServer(app)

    const io = socketio(server)

    io.on("connection", socket => {
        console.log("a user connected :D");
        socket.on("chat message", msg => {
        console.log(msg);
        io.emit("chat message", msg);
        });
    });

    server.listen(8082)

