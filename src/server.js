    const http =require('http')
    const app =require('./app')
    require('dotenv').config();
    const socketio = require('socket.io')
    const server = http.createServer(app)
    const io = require('socket.io')(server, {
      cors: {
        origin: '*',
      }
    });    

    io.on('connection', (socket) => {
      console.log('A user connected');
    
      socket.on('message', (data) => {
        console.log('Message received: ' + data.message);
        io.emit('message', data);
      });
    
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });
      
    server.listen(8082)

