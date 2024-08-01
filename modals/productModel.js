const mongoose= require('mongoose');

const productSchema= new mongoose.Schema({
    name: {
        type:String,
        require: [true,'please enter product name:'],
    },
    Description: {
        type:String,
        require: [true,'please enter the description of product '],

    },
    price: {
        type:Number,
        require: [true,'please enter the price of your product  '],
        max:999999
    },
    // user:{
    //     type:mongoose.Schema.ObjectId,
    //     ref:'user',
    //     require:true,

    // }
})


module.exports = mongoose.model('Products', productSchema)