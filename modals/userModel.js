const mongoose= require('mongoose');
const validator= require('validator');
const bcrypt=require('bcrypt');
const Jwt=require('jsonwebtoken');


const userSchema= new mongoose.Schema({
    name: {
        type:String,
        require: [true,'please enter your name:'],
        maxLength: [30,'name should not exceed the length of 30 char'],
        minLength: [3,'name should have more than 3 char '],
    },
    email: {
        type:String,
        require: [true,'please enter your email '],
        unique: true,
        validate:[validator.isEmail,'please enter a valid email']
    },
    password: {
        type:String,
        require: [true,'please enter your password '],
        select : false,
    },
    role:{
        type:String,
        default:'user',
    }

    
})

userSchema.pre('save',async function(next){
    this.password=await bcrypt.hash(this.password,10);
})
userSchema.methods.comparePassword=async function(enteredPassword){
return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.getJWTToken=function(){
return Jwt.sign({
    id: this._id,

},'abhishek121',{
    expiresIn:5
})
}



module.exports = mongoose.model('Users',userSchema)