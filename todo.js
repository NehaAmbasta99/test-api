const express = require('express')
const mongodb = require('mongoose')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
const Todo = require('./models/todoModel')

exports.getTodo = async (req,res) => {
    try {
        const todo = await Todo.find({});
         res.status(200).json(todo);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
    }

    exports.addTodo = async (req,res) => {
    try{
       const todo = await Todo.create(req.body)
       res.status(200).json(todo)
    }
    catch(error){
       console.log(error);
    }
   }

  
    exports.deleteTodo = async (req,res) => {
        try{
            const {id} = req.params;
            const todo = await Todo.findByIdAndDelete(id);
            if(!todo){
                return res.status(404).json({message: `cannot find any Todo with ID ${id}`})
            }
            const updatedTodoList = await Todo.find({});
            res.status(200).json(updatedTodoList);
        }
        catch(error){
            console.log(error);
        }
    }