const mongoose = require('mongoose');
const Wine = require('../models/wineModel');
const winesJson = require('../json/wines.json');

async function connectDB() {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/wines_DB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Error connecting to MongoDB:', err);
          });

        const count = await Wine.countDocuments();
        if(count === 0){
            await loadWines();
        }else {
            console.log("alredy wines in it");
        }
    }catch (error){
        console.log('Error trying to connect data base', error);
        process.exit(1);
    }
    

}

async function loadWines(){
    try {
        await Wine.insertMany(winesJson);
        console.log("All wines succesfully loaded");
    }catch (error){
        console.log("Error trying to load wines", error);
    } 
}

module.exports = connectDB;
