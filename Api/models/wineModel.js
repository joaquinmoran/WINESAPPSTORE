const mongoose = require('mongoose');

const wineSchema = new mongoose.Schema({
    name: String,
    category: String,
    grapeType: String,
    year: Number,
    description: String,
    amount: String,
    price: Number,
    img: String
});

const Wine = mongoose.model('Wine', wineSchema);

module.exports = Wine;