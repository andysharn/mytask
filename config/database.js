const mongoose = require('mongoose');

const connectDatabase=()=>{
    mongoose.connect('mongodb+srv://projecttodo:cfD6I17KeQZq1Z52@cluster0.0kxh1ev.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then((data)=>{
          console.log(`mongoDb is connected with server :${data.connection.host}`);
    })
}

module.exports = connectDatabase;