const express = require('express')
const mongodb = require('mongoose')
const app = express()
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json());
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
                const { username, email, password, profileImage, phoneNumber } = req.body;

            // Encrypt the password using bcrypt
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
            username,
            name,
            location,
            email,
            password: hashedPassword,
            profileImage: {
                data: Buffer.from(profileImage, 'base64'),
                contentType: 'image/jpeg',
            },
            phoneNumber,
            createdAt : new Date(),
            });

            const savedUser = await newUser.save();
            res.json(savedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
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

        exports.login = async (req,res) => {
            try {
                const { email, password } = req.body;

                // Find the user by email
                const user = await User.findOne({ email });

                if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
                }

                // Compare the provided password with the stored hashed password
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
                }

                res.json({ message: 'Login successful' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }

    }