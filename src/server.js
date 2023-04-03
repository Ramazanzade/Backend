    const http =require('http')
    const PORT= 8082
    const app =require('./app')
    require('dotenv').config();
    const socketio = require('socket.io')
    const server = http.createServer(app)

    server.listen(8082)

