const sendToken= (user,statusCode,res)=>{
    console.log("coming here",user,statusCode);
    const token = user.getJWTToken();

    // const options={ expires : new Date(Date.now()+5*24*60*60*1000),httpOnly:true}

    console.log("random",token);
    res.status(statusCode).cookie('token',token).json({
        success:true,
        user:user,
        token:token
    })
}

module.exports=sendToken;