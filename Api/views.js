const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db/db');
const User = require('./models/userModel');
const Wine = require('./models/wineModel');
const Cart = require('./models/addWineToCart');
const bcrypt = require('bcrypt');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const verifyToken = require('./authMiddleware');
const Order = require('./models/orderModel');

const secretKey = '41322884jm';

const app = express();

app.use(express.static('public'));

app.use(cors());
app.use(bodyParser.json());


connectDB();


app.post('/create_user', async (req, res) => {
    try{
        const {userName, email, age, password} = req.body;
        const hashedPassword= await bcrypt.hash(password, 10);
        const newUser = new User({userName, email, age, password: hashedPassword});
        await newUser.save();
        if(!newUser){
            return res.status(400).json({message: 'Existing username'})
        }
        const token = jwt.sign({userId: newUser.id}, secretKey, {expiresIn: '1h'});
        res.status(200).header('auth-token', token).json({error: null, data: {token} ,message: 'User load successfully'});
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
        const user = await User.findOne({userName});
        if(user){
            bcrypt.compare(password, user.password)
            .then((match) => {
                if(match){
                    const token = jwt.sign({userId: user.id}, secretKey, {expiresIn: "3600S"});
                    console.log('token del back:',token)
                    res.header('auth-token', token).json({error: null , data: {token} });
                } else {
                    res.status(400).json({message: 'Incorrect Password'});
                }
            })
        } else {
            res.status(400).json({message: 'Incorrect username'});
        }
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

app.post('/order', verifyToken, async(req,res) => {
    try {
        const user_id = req.user.userId;
        console.log('userid:', user_id);
        const user = await User.findById(user_id);
        console.log(user);
        if(!user) {
            throw new Error('user not found.');
        }
        const wines_ids = user.cart.map(item => item.wine);
        console.log('Winess:',wines_ids); // Extraer solo los IDs de los vinos
        const newOrder = new Order({
            status: true,
            user: user_id,
            wines: wines_ids,
        });
        console.log('Order:',newOrder);
        await newOrder.save();
        user.cart = [];
        await user.save();
        res.status(200).json({message: 'order saved'});
    } catch (error) {
        res.status(500).json({message: 'error while loading the order'});
    }
})

app.post('/add_to_cart', verifyToken, async(req,res) => {
    try {
        const user_id = req.user.userId;
        console.log('userid:', user_id);
        const user = await User.findById(user_id);
        if(!user) {
            throw new Error('user not found.');
        }
        console.log('antes',user.cart)
        const wine_id = req.body.wineId;
        console.log('WINE ID:', wine_id);
        const wine_indx = user.cart.findIndex(item => item.wine.toString() === wine_id);
        if(wine_indx !== -1) {
            user.cart[wine_indx].quantity++;
        } else {
            user.cart.push({ wine: wine_id });
        }
        await user.save();
        res.status(200).json({message:'wine added to cart'})
    } catch (error) {
        console.error(error);
        throw new Error('error adding wine to cart.');
    }
})



app.get('/get_cart_wines', verifyToken, async(req, res) => {
    try {
        const user_id = req.user.userId;
        const user = await User.findById(user_id).populate('cart.wine');
        if(!user) {
            throw new Error('user not found.');
        }
        const wines = user.cart;
        res.status(200).json({wines})
    }catch (error) {
        res.status(500).json({message: "Error getting the wines from cart list"});
    }
})

app.delete('/delete_wine_from_cart/:id', verifyToken ,async(req, res) => {
    try{
        const user_id = req.user.userId;
        const user = await User.findById(user_id);
        if(!user) {
            throw new Error('user not found');
        }
        const wine_id = req.params.id;
        console.log('ide del vino', wine_id);
        const wine_indx = user.cart.findIndex(item => item.wine.toString() === wine_id);
        console.log('wine idd:',wine_indx);
        if(user.cart[wine_indx].quantity > 1) {
            user.cart[wine_indx].quantity--;
        } else {
            user.cart.splice(wine_indx, 1);
        }
    
        console.log('cart in BD:', user.cart);
        await user.save();


        const userCart = await User.findById(user_id).populate('cart.wine');
        const newCart = userCart.cart;
        res.status(200).json({newCart});
    }catch (error) {
        res.status(500).json({message: "Error trying to delete a wine from cart"});
    }
})

app.get('/wine_description/:name', async(req,res) => {
    try{
        const {name} = req.params;
        const descr = await Wine.findOne({name}, 'description');
        if(descr !== null) {
            res.status(200).json({message: `Description of ${name}`, description: descr.description});
        }else {
            res.statue(404).json({message: 'Non-existent wine'})
        }
    }catch (error) {
        res.status(500).json({message: 'Error trying to show description'});
    }
})

const port = 3001;
app.listen(port, () => {
  console.log(`Server running in port: ${port}`);
});
78