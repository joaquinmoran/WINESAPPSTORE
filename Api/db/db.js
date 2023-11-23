const mongoose = require('mongoose');
const Wine = require('../models/wineModel');
const winesJson = require('../json/wines.json');

async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/wines_DB', {});
        console.log('Connection to the database successful');

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
