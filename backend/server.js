const express= require('express')
const app=express();
const http = require('http');
const socketIo = require('socket.io');

require('dotenv').config();

const server=http.createServer(app)
const io= socketIo(server)


app.get("/",(req,res)=>{
    res.send("This is home page")
})

io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('userJoined', (data) => {
      const{name, userId, roomId, host, presenter}=data
     socket.join(roomId)
     socket.emit("userIsJoined",{success:true})
    });
  
    
  });


const PORT=process.env.PORT || 4000;

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

