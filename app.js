const  express=require ('express');
const cookieparser=require('cookie-parser');


const  app=express();

app.use(express.json());
app.use(cookieparser());


const user=require('./routes/userRoutes');

app.use('/api/v1',user);


module.exports = app;