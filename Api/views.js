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
const nodemailer = require('nodemailer');
const compression = require('compression');
const cluster = require('cluster');
const os = require('os');
const helmet = require('helmet');
const morgan = require('morgan')
const mt_email = 'miterrunorioiv@gmail.com'

// require('dotenv').config()


const secretKey = '41322884jm';

// if (cluster.isMaster) {
//     const numCPUs = os.cpus().length;
//     for (let i = 0; i < numCPUs; i++) {
//       cluster.fork();
//     }
//   } else {
        const app = express();

        app.use(express.static('public'));
        app.use(cors())
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(compression());
        app.use(helmet());
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Something broke!');
        });
        app.use(morgan('combined'));

        connectDB();

        app.post('/create_user', async (req, res) => {
            try{
                const {userName, tel, age, password} = req.body;
                const hashedPassword= await bcrypt.hash(password, 10);
                const newUser = new User({userName, tel, age, password: hashedPassword});
                await newUser.save();
                if(!newUser){
                    return res.status(400).json({message: 'Existing username'})
                }
                const token = jwt.sign({userId: newUser.id}, secretKey, {expiresIn: '1h'});
                res.status(200).header('Authorization', token).json({error: null, data: {token} ,message: 'User load successfully'});
            }catch (error){
                res.status(500).json({message: 'Error trying to load a user'});
            }
        });

        app.get('/get_users', async (req, res) => {
            try{
                const users = await User.find();
                res.status(201).json(users);
            }catch (error){
                res.status(500).json({error: 'Error trying to show users'});
            }
        });

        app.post('/login', async(req, res) => {
            try{
                const {userName, password} = req.body;
                // if(userName === '' || password === '') {
                //     res.status(401).json({message: 'Wrong username or password'});
                // } else {
                const user = await User.findOne({userName});
                if(user){
                    bcrypt.compare(password, user.password)
                    .then((match) => {
                        if(match){
                            const token = jwt.sign({userId: user.id}, secretKey, {expiresIn: "3600S"});
                            console.log('token del back:',token)
                            res.header('Authorization', token).json({error: null , data: {token} });
                        } else {
                            res.status(400).json({message: 'Incorrect Password'});
                        }
                    })
                }else{ 
                    res.status(401).json({message: 'Wrong username or password'});
                }
                // }
            } catch (error){
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
                console.log("entro al listwines")
                const winesList = await Wine.find();
                res.status(200).json(winesList);
            }catch (error) {
                res.status(500).json({message: 'Error trying to list availables wines'});
            }
        });

        app.post('/order', verifyToken, async(req,res) => {
            try {
                const user_id = req.user.userId;
                console.log('userid:', user_id);
                const user = await User.findById(user_id);
                console.log(user);
                if(!user) {
                    throw new Error('user not found.');
                }
                const age = user.age
                if(age < 18 ) {
                    res.status(400).json({messag: 'No puedes realizar un orden siendo menor de edad'})
                }

                const wines_data = user.cart.map(item => {
                    const { _id, wine, quantity } = item;
                    return {wine, quantity}
                });

                console.log('Wines data:',wines_data); // Extraer solo los IDs de los vinos

                const newOrder = new Order({
                    status: true,
                    user: user_id,
                    wines: wines_data,
                });
                
                console.log('Order:',newOrder);
                const wines = await Promise.all(wines_data.map(async wines => {
                    const wine_model = await Wine.findById(wines.wine)
                    const wine_name = wine_model ? wine_model.name : 'not found';
                    const quantity = wines.quantity;
                    return { wine_name, quantity }
                }));

                console.log("wines: " +     wines);

                const order = {
                    userName: user.userName,
                    wines: wines
                }

                await newOrder.save();
                
                console.log('better format order:', order);
                
                user.cart = [];
                await user.save();
                const user_newcart = user.cart
                res.status(200).json({message: 'order saved', order, user_newcart});
            } catch (error) {
                res.status(500).json({message: 'error while loading the order'});
            }
        });

        app.post('/add_to_cart/:id', verifyToken, async(req,res) => {
            try {
                const wine_id = req.params.id;
                const quantity = parseInt(req.body.quantity, 10); // Convierte a entero
                if (isNaN(quantity) || quantity <= 0) {
                    return res.status(400).json({ message: 'Invalid quantity' });
                }
                
                const wine = await Wine.findById(wine_id);
                if(!wine) {
                    throw new Error('Wine not found.');
                }
                const user_id = req.user.userId;
                const user = await User.findById(user_id);
                const cartItem = user.cart.find(item => item.wine.toString() === wine_id);
                console.log("cartItem " + cartItem)
                if(cartItem) {
                    cartItem.quantity = cartItem.quantity + quantity
                } else {
                    user.cart.push({wine: wine_id, quantity: quantity})
                }

                await user.save();
                res.status(200).json({message:'wine added to cart'})
            } catch (error) {
                res.status(500).json({message: "Error adding the wine"});
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

        app.get('/get_wine/:id', async(req, res) =>  {
            try {
                console.log(req.params)
                const wine_id = req.params.id
                console.log(wine_id)
                const wine_data = await Wine.findById(wine_id)
                console.log(wine_data)
                if(wine_data) {
                    res.status(200).json({wine_data})
                } else {
                    res.status(404).json({message: 'Non-existent wine'})
                }
            } catch (error) {
                res.status(500).json({message: 'Error when searching for a wine'});
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
                const wine_indx = user.cart.findIndex(item => item.wine.toString() === wine_id);
                console.log('wine idd:',wine_indx);
                if(user.cart[wine_indx].quantity > 1) {
                    user.cart[wine_indx].quantity--;
                } else {
                    user.cart.splice(wine_indx, 1);
                }
            
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
                    res.status(404).json({message: 'Non-existent wine'})
                }
            }catch (error) {
                res.status(500).json({message: 'Error trying to show description'});
            }
        });

        app.post('/contact-seller', verifyToken, async(req,res) => {
            const user_id = req.user.userId;
            const user = await User.findById(user_id);
            if(!user) {
                throw new Error('user not found');
            }
            const user_name = user.userName
            const user_tel = user.tel
            const msg = req.body.msg;
            const total = req.body.total;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: mt_email,
                    pass: 'cfuk wnts ewtw jksx',
                },
            });

            const mailTosend = {
                from: mt_email,
                to: mt_email,
                subject:  `Hola! mi nombre es ${user_name}. Este es mi pedido`,
                text: msg + `\nComprador: ${user_name} \nTelefono: ${user_tel}  \nMonto: $${total}`,
            };

            transporter.sendMail(mailTosend, (error, info) => {
                if(error) {
                    console.error('Error sending the mail', error);
                    res.status(500).send('Error sending the mail.');
                } else {
                    console.log('Email sended', info.response);
                    res.status(200).send('Email sendend succescfully');
                }
            });
        });

        const port = process.env.port || 3001;
        app.listen(port, () => {
        console.log(`Server running in port: ${port}`);
        });

//}

