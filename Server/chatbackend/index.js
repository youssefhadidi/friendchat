const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(cors());

const users = [];

/*app.post('/api/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.send(user);
});*/

app.get('/api/users', (req, res) => {
  res.send(users);
})

/*function receive(message){
    console.log('test', message)
}*/

io.on('connection', socket => {

  socket.on("user login", user => {
    users.push(user);
    socket.username = user.username;
    io.emit("all users", users);
  })

  socket.on("chat message", msg =>{
    console.log(msg);
    io.emit("chat message", msg);
  })

  socket.on('disconnect', () => {
    const index = users.findIndex(u => u.username === socket.username);
    users.splice(index, 1);
    io.emit("all users", users);
    console.log("user disconnect")
  })
});


// io.on('receive',value, receive)

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});