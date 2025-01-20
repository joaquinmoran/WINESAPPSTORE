const mongoose = require('mongoose');
const Wine = require('./wineModel');


const userSchema = new mongoose.Schema({
    userName: {type: String, unique: true},
    tel: String,
    age: Number,
    password: String,
    cart: [{
        wine: {type: mongoose.Schema.Types.ObjectId, ref:'Wine'},
        quantity: {type: Number, default: 1}
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;