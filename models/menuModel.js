const mongodb = require('mongoose');
const menuSchema = mongodb.Schema(
    {
        category:{
            type:String,
            required:true
        },
        cuisine:{
            type:String,
            required:true
        },
        price:{
            type:String,
            required:true
        },
        consumableRatio:{
            type:String,
            required:true
        },
        discount:{
            type:String,
            required:true
        },
        discountPercentage:{
            type:String,
            required:true
        },
        tags:{
            type:String,
            required:false
        },
        categoryId:{
            type:Number,
            required:true
        },
        menu:{
            type:[String],
            required:true
        },
        restaurantId:{
            type:String,
            required:true
        },
        menuImg:{
            type:String,
            required:false
        },
        ingredients:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        }
    }
)
const Menu = mongodb.model('Menu', menuSchema)
module.exports = Menu;