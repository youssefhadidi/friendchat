const express = require("express");
const User = require("./User");
const router = express.Router();

// changed array to object for faster lookup operation
const users = {};
const sockets = {};

router.post('/', (req, res) => {
    const error = validateUser(req.body);
    if (error) return res.status(400).send(error);

    const user = new User(req.body.username);
    users[req.body.username.toLowerCase()] = user;
    res.send(user);
})

const validateUser = user => {
    const regexPattern = /^[A-Za-z0-9]/;

    const valid = regexPattern.test(user.username);
    if (!valid) return "Invalid Username";


    if (users[user.username.toLowerCase()])
        return "Username already exists";
    
    return null;
}

const registerUserHandlers = (io, socket) => {
  
  socket.on("user_login", user => {
    /** user = {username: String, id: Number, isInPublic: boolean} */

    socket.data.username = user.username.toLowerCase();
    socket.data.userId = user.id;

    /** add current socket to sockets, using user's id as its key */
    sockets[user.id] = socket;
    console.log(sockets)
    
    if(user.isInPublic)
      socket.join("#public");

    const usersData = Object.values(users);
    io.to('#public').emit("all_users", usersData);
      
    });

    socket.on("disconnect", () => {
      delete users[socket.data.username];
      const usersData = Object.values(users);

      io.emit("all_users", usersData);
      console.log("user disconnect");
    });
}

const updateUserData = (io, socket) => {
  socket.on("update_status", status => {
    const user = users[socket.data.username];
    user.status = status;
    const usersData = Object.values(users);
    io.emit("all_users", usersData);
  })
}

const getUser = username => {
  return users[username];
}

const getSocket = userId => {
  return sockets[userId];
}

module.exports = {userRouter: router, registerUserHandlers, updateUserData, getUser, getSocket};