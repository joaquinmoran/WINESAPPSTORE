const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {type: String, unique: true},
    email: String,
    age: Number,
    password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;