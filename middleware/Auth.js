// const jwt=require('jsonwebtoken');
// const User=require("../modals/userModel");



// exports.isAuthenticatedUser =async(req,res,next)=>{
//     console.log("coming in is authenticate user");
//     const {token} =req.cookies;
//     if(!token){
//         return res.json({
//             success: false,
//             message: "token not found"
//         })
//     }

//     const decodeData= jwt.verify(token,'abhishek121')
//     req.user=await User.findById(decodeData.id);
//     next();
// }


// exports.authorisedRole = async(...roles)=>{
//     console.log("coming in is authenticate user  2"  );

//  return (req,res,next)=>{
//     if(!roles.includes(req.user.roles)){
//        const error= new Error("role is not allowed");
//        error.statusCode=403;
//        return next(error)
//     }
//     next();
//  }
// }


const jwt = require('jsonwebtoken');
const User = require("../modals/userModel");

exports.isAuthenticatedUser = async (req, res, next) => {
    // console.log("coming in is authenticate user");
    const { token } = req.cookies;
    if (!token) {
        return res.json({
            success: false,
            message: "token not found"
        });
    }

    const decodeData = jwt.verify(token, 'abhishek121');
    req.user = await User.findById(decodeData.id);
    next();
}

exports.authorisedRole = (...roles) => {
    // console.log("coming in is authenticate user 2");

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {  // fixed 'req.user.role' instead of 'req.user.roles'
            const error = new Error("role is not allowed");
            error.statusCode = 403;
            return next(error);
        }
        next();
    }
}
