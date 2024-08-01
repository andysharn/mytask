const app=require('./app');
const connectDatabase=require('../backend/config/database');

connectDatabase();
const server= app.listen(3000,()=>{

    console.log(`server is running on http://localhost:3000`);

})

