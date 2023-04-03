    const http =require('http')
    const PORT= 8082
    const app =require('./app')
    require('dotenv').config();
    const socketio = require('socket.io')
    const server = http.createServer(app)
    const { Server } = require("socket.io");


    const io = new Server(server, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"],
        },
      });
      io.on("connection", (socket) => {
        console.log(`User Connected`);
      
        socket.on("join_room", (data) => {
          socket.join(data);
          console.log(`User Connected: ${socket.id}`);

        });
      
        socket.on("send_message", (data) => {
          io.to(data.room).emit("receive_message", data);
        });
      });
      
    server.listen(8082)

