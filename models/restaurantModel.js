const mongodb = require('mongoose');
const Menu = require('./menuModel');


const restaurantSchema = mongodb.Schema(
    {
        name:{
            type:String,
            reuired:true
        },
        id:{
            type:Number,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        avgDeliveryTime:{
            type:Number,
            required:false
        },
        rating:{
            type:Number,
            required:false
        },
        imgSrc:{
            type:String,
            required:false
        },
        cuisines:{
            type:[String],
            required:false
        },
        promoted:{
            type:Boolean,
            required:false
        }
    },
    {timestamps:true}
)
const Restaurant = mongodb.model('Restaurant', restaurantSchema)

module.exports = Restaurant;
