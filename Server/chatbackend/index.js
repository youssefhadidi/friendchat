const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const config = require("config");
const { userRouter, registerUserHandlers, updateUserData } = require("./handlers/userHandlers");
const { messagesDelivery } = require('./handlers/messagesHandlers');

if (!config.get("jwtPrivateKey")) {
  console.error("Error: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://127.0.0.1:27017/friendChat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter)

io.on('connection', socket => {
  
  registerUserHandlers(io, socket);
  updateUserData(io, socket);
  messagesDelivery(io, socket);

});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

