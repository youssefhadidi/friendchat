const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { userRouter, registerUserHandlers, updateUserData } = require("./handlers/userHandlers");
const { messagesDelivery } = require('./handlers/messagesHandlers');

const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter)

io.on('connection', socket => {
  
  registerUserHandlers(io, socket);
  updateUserData(io, socket);
  //roomServicesHandler(io, socket);
  messagesDelivery(io, socket);

});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

