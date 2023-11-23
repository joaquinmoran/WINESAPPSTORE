const mongoose = require('mongoose');

const wineSchema = new mongoose.Schema({
    category: String,
    grapeType: String,
    year: Number,
    description: String,
    price: Number,
});

const Wine = mongoose.model('Wine', wineSchema);

module.exports = Wine;