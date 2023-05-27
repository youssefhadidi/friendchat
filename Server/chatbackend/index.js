const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{cors:{ origin: '*'}});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

function receive(message){
    console.log('test', message)
}

io.on('connection', (socket) => {

  console.log('a user connected');

  socket.on('returnmessage',(value)=>{
    console.log(value);
  })
});

// io.on('receive',value, receive)

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});