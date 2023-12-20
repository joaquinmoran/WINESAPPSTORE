const Wine = require('./wineModel');

const wineList = [];
const winesIds = [];

async function addWineInListCart(wineId){
    try{
        winesIds.push(wineId);
        console.log('id:',wineId);
        const wine = await Wine.findById(wineId);
        if(wine) {
            wineList.push(wine);
        }else {
            console.log('No stock, sorry');
        }
    }catch (error) {
        console.log("Error adding the wine ", error);
    }
}

async function getWinesIds() {
    return winesIds;
}

async function deleteWineOfListCart(id) {
    try {
        const indexToDelete = wineList.findIndex(wine => wine._id === id);
        if(indexToDelete !== -1){
            wineList.splice(indexToDelete, 1);y
            console.log("Deleted")
            return wineList;
        }else {
            console.log("Wine is not in cart");
        }

    }catch (error){
        console.log("Error trying to delete a wine form cart");
    }
}

async function getListOfWines() {
    return wineList;
}

module.exports = {
    addWineInListCart,
    getWinesIds,
    deleteWineOfListCart,
    getListOfWines,
}