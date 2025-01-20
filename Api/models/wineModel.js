const mongoose = require('mongoose');

const wineSchema = new mongoose.Schema({
    name: String,
    origin: String,
    color: String,
    scent: String,
    mouth: String,
    extra: String,
    stock: Number,
    price: Number,
    img: String
});


const Wine = mongoose.model('Wine', wineSchema);

module.exports = Wine;