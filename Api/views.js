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
        res.status(201).json(token ,{message: 'User load successfully'});
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


app.get('/list_wines', verifyToken , async(req, res) => {
    try{
        const winesList = await Wine.find();
        res.status(200).json(winesList);
    }catch (error) {
        res.status(500).json({message: 'Error trying to list availables wines'});
    }
})

app.post('/add_wine_to_cart', async(req, res) => {
    try{
        const name = req.body;
        const cartList = await Cart.addWineInListCart(name.wineName);
        res.status(200).json(cartList);
    }catch (error) {
        res.status(500).json({message: "Error trying to add a wine"});
    }
})

app.get('/get_cart_wines', async(req, res) => {
    try {
        const winesList = await Cart.getListOfWines();
        console.log(winesList);
        res.status(200).json(winesList);
    }catch (error) {
        res.status(500).json({message: "Error geting the wines from cart list"});
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