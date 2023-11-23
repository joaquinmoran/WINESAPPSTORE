const Wine = require('./wineModel');

const wineList = []

async function addWineInListCart(name){
    try{
        const wine = await Wine.findOne(name);
        if(wine && wine.amount > 0) {
            wineList.push(wine);
            return wineList;
        }else {
            console.log('No stock, sorry');
        }
    }catch (error) {
        console.log("Error adding the wine ", error);
    }
}

async function deleteWineOfListCart(name) {
    try {
        const indexToDelete = wineList.findIndex(wine => wine.name === name);

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

module.exports = {
    addWineInListCart,
    deleteWineOfListCart,
}