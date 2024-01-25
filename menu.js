const express = require('express')
const mongodb = require('mongoose')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
const Menu = require('./models/menuModel')

exports.getMenuById = async (req,res) => {
    try {
        const menu = await Menu.findById(id,req.body);
         res.status(200).json(menu);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
    }

exports.getMenu = async (req,res) => {
    try {
        const menu = await Menu.find({});
         res.status(200).json(menu);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
    }

    exports.addMenu = async (req,res) => {
    try{
       const menu = await Menu.create(req.body)
       res.status(200).json(menu)
    }
    catch(error){
       console.log(error);
    }
   }

   exports.updatedMenu = async (req,res) => {
    try{
        const {id} = req.params;
        const menu = await Menu.findByIdAndUpdate(id, req.body);
        if(!menu){
            return res.status(404).json({message: `cannot find any Menu with ID ${id}`})
        }
        const updatedMenu = await Menu.findById(id);
        res.status(200).json(updatedMenu);
     }
     catch(error){
        console.log(error);
     }
    }

    exports.deleteMenu = async (req,res) => {
        try{
            const {id} = req.params;
            const menu = await Menu.findByIdAndDelete(id);
            if(!menu){
                return res.status(404).json({message: `cannot find any menu with ID ${id}`})
            }
            const updatedMenuList = await Menu.find({});
            res.status(200).json(updatedMenuList);
        }
        catch(error){
            console.log(error);
        }
    }