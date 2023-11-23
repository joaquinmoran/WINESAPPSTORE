const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db/db');
const User = require('./models/userModel');
const Wine = require('./models/wineModel');
const Cart = require('./models/addWineToCart');

const app = express();
app.use(bodyParser.json());


connectDB();


app.post('/create_user', async (req, res) => {
    try{
        const {userName, email, age, password} = req.body;
        const newUser = new User({userName, email, age, password});
        await newUser.save();
        if(!newUser){
            return res.status(400).json({message: 'Existing username'})
        }
        res.status(201).json({message: 'User load successfully'});
    }catch (error){
        res.status(500).json({message: 'Error trying to load a user'});
    }
});

app.get('/get_users', async (req, res) => {
    try{
        const users = await User.find();
        res.status(201).json(users);
    }catch (error){
        res.status(500).json({message: 'Error trying to show users'});
    }
});

app.post('/login', async(req, res) => {
    try{
        const {userName, password} = req.body;
        const user = await User.find({userName, password});
        if(!user){
            return res.status(400).json({message: 'Username or password invalid'});
        }
        res.status(200).json(user);
    }catch (error){
        res.status(500).json({message: 'Error trying to login'});
    }
});


app.delete('/delete_user/:id', async (req, res) => {
    try{
        const userId = req.params.id;

        const delUser = await User.findByIdAndDelete(userId);
        if(!delUser) {
            return res.status(400).json({message: 'User does not exist'});
        }
        res.status(200).json({message: 'User deleted', user: delUser});
    }catch (error){
        res.status(500).json({message: 'Error trying to delete a user'});
    }
});

app.get('/list_wines', async(req, res) => {
    try{
        const winesList = await Wine.find();
        res.status(200).json(winesList);
    }catch (error) {
        res.status(500).json({message: 'Error trying to list availables wines'});
    }
})

app.post('/add_wine_to_cart', async(req, res) => {
    try{
        const {name} = req.body;
        const cartList = await Cart.addWineInListCart({name});
        res.status(200).json(cartList);
    }catch (error) {
        res.status(500).json({message: "Error trying to add a wine"});
    }
})

app.delete('/delete_wine_from_cart/:name', async(req, res) => {
    try{
        const {name} = req.params;
        const cartList = await Cart.deleteWineOfListCart(name);
        res.status(200).json(cartList);
    }catch (error) {
        res.status(500).json({message: "Error trying to delete a wine from cart"});
    }
})

const port = 3001;
app.listen(port, () => {
  console.log(`Server running in port: ${port}`);
});
