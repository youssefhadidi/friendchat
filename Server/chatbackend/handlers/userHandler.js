const express = require("express");
const User = require("./User");
const router = express.Router();

// changed array to object for faster lookup operation
const users = {};

router.post('/', (req, res) => {
    const error = validateUsername(req.body);
    if (error) return res.status(400).send(error);

    const user = new User(req.body.username);
    users[req.body.username.toLowerCase()] = user;
    res.send(user);
})

const validateUsername = user => {
    const regexPattern = /^[A-Za-z0-9]/;

    const valid = regexPattern.test(user.username);
    if (!valid) return "Invalid Username";


    if (users[user.username.toLowerCase()])
        return "Username already exists";
    
    return null;
}

const registerUserHandlers = (io, socket) => {
    socket.on("user_login", (user) => { 
        socket.username = user.username.toLowerCase();
        socket.id = user.id;
        const usersData = Object.values(users);
      io.emit("all_users", usersData);
    });

    socket.on("disconnect", () => {
      delete users[socket.username];
      const usersData = Object.values(users);
      io.emit("all_users", usersData);
      console.log("user disconnect");
    });
}

module.exports = {userRouter: router, registerUserHandlers};