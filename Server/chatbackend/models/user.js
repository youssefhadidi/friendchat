const mongoose = require('mongoose');
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        maxLength: 50,
        unique: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        minLength: 5,
        maxLength: 50,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 255,
        required: true
    },
    status: {
        type: String,
        default: "online",
        required: true
    },
    isInPublic: {
        type: Boolean,
        default: true,
        required: true
    }
});

userSchema.methods.getAuthToken = function (args) {
    const token = jwt.sign({...args}, config.get("jwtPrivateKey"));
    return token;
}

const User = mongoose.model("User", userSchema);

const validateUser = user => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().min(8).max(50).required()
    });

    return schema.validate(user);
}

module.exports = { User, validateUser };