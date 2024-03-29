const express = require('express')
const dotenv = require('dotenv').config();
var cors = require('cors')
var app = express()
const mongodb = require('mongoose')
const Restaurant = require('./models/restaurantModel')
const menu = require('./menu')
const todo = require('./todo')
const user = require('./user')
const dbConnectionString = process.env.DB_CONNECTION_STRING;
const Menu = require('./models/menuModel')
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/menu', menu.getMenu);
app.get('/menu/:id', menu.getMenuById);
app.post('/menu/',  menu.addMenu);
app.put('/menu/:id', menu.updatedMenu);
app.delete('/menu/:id', menu.deleteMenu);

app.get('/user', user.getUser);
app.get('/user/:id', user.getUserById);
app.post('/user/',  user.addUser);
app.put('/user/:id', user.updatedUser);
app.delete('/user/:id', user.deleteUser);
// app.post('/login',  user.login);

app.get('/todo', todo.getTodo);
app.post('/todo/',  todo.addTodo);
app.delete('/todo/:id', todo.deleteTodo);





app.use(cors());
app.get('/',(req,res) => {
    res.send('Hello')
    })
app.get('/restaurants', async (req,res) => {
    try {
        const restaurant = await Restaurant.find({});
        res.status(200).json(restaurant);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
    })

    app.get('/restaurants/:id', async (req,res) => {
        try {

            const restaurant = await Restaurant.findById(req.params.id,req.body);
            const menu = await Menu.find({});
            const filterByRestaurantId = menu.filter(item => item.restaurantId === req.params.id);
            res.status(200).json({menu:filterByRestaurantId, restaurant:restaurant});
        } catch (error) {
            console.log(error)
            res.status(500).json({message: error.message})
        }
        })


app.post('/restaurant', async (req,res)=> {
 try{
    const restaurant = await Restaurant.create(req.body)
    res.status(200).json(restaurant)
 }
 catch(error){
    console.log(error);
 }
})

app.put('/restaurants/:id',async (req,res)=> {
    try{
        const {id} = req.params;
        const restaurant = await Restaurant.findByIdAndUpdate(id, req.body);
        if(!restaurant){
            return res.status(404).json({message: `cannot find any restaurant with ID ${id}`})
        }
        const updatedRestaurant = await Restaurant.findById(id);
        res.status(200).json(updatedRestaurant);
     }
     catch(error){
        console.log(error);
     }
    })

    app.put('/restaurants',async (req,res)=> {
        try{
            const restaurant = await Restaurant.find({});
            if(!restaurant){
                return res.status(404).json({message: `cannot find any restaurant with ID ${id}`})
            }
            for(let i=0;i<restaurant.length;i++){
                const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurant[i]._id, req.body);
                console.log(req.body);
            }
            res.status(200).send('All ids updated');      
         }
         catch(error){
            console.log(error);
         }
        })

app.delete('/restaurants/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const restaurant = await Restaurant.findByIdAndDelete(id);
        if(!restaurant){
            return res.status(404).json({message: `cannot find any restaurant with ID ${id}`})
        }
        const updatedRestaurantList = await Restaurant.find({});
        res.status(200).json(updatedRestaurantList);
    }
    catch(error){
        console.log(error);
    }
})

mongodb.set("strictQuery", false);
mongodb.connect(dbConnectionString)
.then(() => {
    console.log('connected to MongoDB')
    app.listen(PORT, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
}) 