const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const {userRouter, registerUserHandlers, updateUserData} = require("./handlers/userHandler");

const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter)

io.on('connection', socket => {
  console.log("a user connect")
  socket.on("chat_message", msg =>{
    io.emit("chat_message", msg);
  })

  registerUserHandlers(io, socket);
  updateUserData(io, socket);
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});