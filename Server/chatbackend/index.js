const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { userRouter, registerUserHandlers, updateUserData } = require("./handlers/userHandler");
const { removeFile, imageResizingProcess } = require('./utils/utils');

const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter)

io.on('connection', socket => {
  
  socket.on("chat_message", msg => {
    if (/^image/.test(msg.payload.type)) {
      const result = imageResizingProcess(msg.payload);
      result
        .then((dataUrl) => {
          msg.payload.data = dataUrl;
          return msg;
        })
        .then((res) => io.emit("chat_message", res));
    } else 
        io.emit("chat_message", msg);
  })

  registerUserHandlers(io, socket);
  updateUserData(io, socket);
});


const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

