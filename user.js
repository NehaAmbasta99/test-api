const express = require('express')
const mongodb = require('mongoose')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
const User = require('./models/userModel')

exports.getUserById = async (req,res) => {
    try {
        const user = await User.find({});
        const filterByRestaurantId = user.filter(item => item.restaurantId === req.params.id)
         res.status(200).json(filterByRestaurantId);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
    }

exports.getUser = async (req,res) => {
    try {
        const user = await User.find({});
         res.status(200).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
    }

    exports.addUser = async (req,res) => {
    try{
       const user = await User.create(req.body)
       res.status(200).json(user)
    }
    catch(error){
       console.log(error);
    }
   }

   exports.updatedUser = async (req,res) => {
    try{
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if(!user){
            return res.status(404).json({message: `cannot find any User with ID ${id}`})
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
     }
     catch(error){
        console.log(error);
     }
    }

    exports.deleteUser = async (req,res) => {
        try{
            const {id} = req.params;
            const user = await User.findByIdAndDelete(id);
            if(!user){
                return res.status(404).json({message: `cannot find any user with ID ${id}`})
            }
            const updatedUserList = await User.find({});
            res.status(200).json(updatedUserList);
        }
        catch(error){
            console.log(error);
        }
    }