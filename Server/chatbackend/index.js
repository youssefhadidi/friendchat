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
    console.log(message)
}

io.on('connection', (socket) => {
  console.log('a user connected');
});

io.on('receive',value, receive)


server.listen(4000, () => {
  console.log('listening on *:4000');
});