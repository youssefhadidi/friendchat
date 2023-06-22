const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const config = require("config");
const jwt = require("jsonwebtoken");
const user = require('./routes/user');
const auth = require('./routes/auth');
const { userLoginHandlers, updateUserHandlers } = require("./handlers/userHandlers");
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
app.use('/api/user', user);
app.use('/api/auth', auth);

/**Auth Middleware*/
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    next(new Error("Access Denied. No Token Provided"));
  };

  let decoded;
  try {
    decoded = jwt.verify(token, config.get("jwtPrivateKey"));
  } catch (error) {
    next(new Error("Access Denied. Invalid Token"));
  }

  if (!decoded.isAuthorized)
    next(new Error("Access is Denied."));
  
  socket.data.user._id = decoded._id;
  next();
});

io.on('connection', socket => {
  
  userLoginHandlers(io, socket);
  updateUserHandlers(io, socket);
  messagesDelivery(io, socket);

});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

