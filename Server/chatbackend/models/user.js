const mongoose = require('mongoose');
const Joi = require("joi");

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
        minLength: 5,
        maxLength: 50,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 50,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

const validateUser = user => {
    const schema = {
        username: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().min(8).max(50).required()
    };

    return Joi.validate(user, schema);
}

module.exports = { User, validateUser };