const express = require("express");
const router = express.Router();
const Joi = require("joi");

const users = [];

router.post('/', (req, res) => {
    const error = validateUsername(req.body);
    if (error) return res.status(400).send(error);

    const user = { id: users.length + 1, username: req.body.username };
    users.push(user);
    res.send(user);
})

const validateUsername = username => {
    const schema = Joi.object({
        username: Joi.string().required().label("Username")
    });
    
    const {error} = schema.validate(username);
    if (error) return error.details[0].message;

    if (users.find(u => u.username.toLowerCase() === username.username.toLowerCase()))
        return "Username already exists";
    
    return null;
}

const registerUserHandlers = (io, socket) => {
    socket.on("user login", (user) => { 
        socket.username = user.username;
        socket.id = user.id;
      io.emit("all users", users);
    });

    socket.on("disconnect", () => {
      const index = users.findIndex((u) => u.username === socket.username);
      users.splice(index, 1);
      io.emit("all users", users);
      console.log("user disconnect");
    });
}


module.exports = {userRouter: router, registerUserHandlers};