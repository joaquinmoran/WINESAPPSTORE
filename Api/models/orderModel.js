const mongoose = require('mongoose');
const Wine = require('./wineModel');
const User = require('./userModel');

const orderSchema = new mongoose.Schema({
    status: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    wines: [{
        wine: { type: mongoose.Schema.Types.ObjectId, ref: 'Wine' },
        quantity: { type: Number, default: 1 }
    }]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;