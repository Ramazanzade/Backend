    const http =require('http')
    const PORT= 8082
    const app =require('./app')
    require('dotenv').config();
    const socketio = require('socket.io')
    const server = http.createServer(app)
    const { Server } = require("socket.io");
    const io = new Server(server);   
    io.on('connection', (socket) => {
        console.log('a user connected');
      
      
        socket.on('send_message',(data)=>{
          console.log("received message in server side",data)
          io.emit('received_message',data)
        })
      
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
        
      });
    server.listen(8082)

