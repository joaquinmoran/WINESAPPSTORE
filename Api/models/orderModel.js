const mongoose = require('mongoose');
const Wine = require('./wineModel');
const User = require('./userModel');

const orderSchema = new mongoose.Schema({
    status: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    wines: [{type: mongoose.Schema.Types.ObjectId, ref:'Wine'}],
})

const Order = mongoose.model('Order', orderSchema);



module.exports = Order;