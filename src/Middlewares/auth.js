const jwt = require('jsonwebtoken');
const User = require('../models/users')
 exports.isAuth = async (res,req,next)=>{
    if(req.headres && req.headres.authorziontal){
        const token = req.headres.authorziontal.split(' ')[1]

try {
    const decode =jwt.verify(token , process.env.JWT_SECRET);
        const user = await User.findById(decode.userId)
        if(!user){
            return res.json({success:false , message:'Unauthorziontal access!'})
        }
        req.user = user
        next()
} catch (error) {
    if(error.name === 'JsonWebTokenError'){
        return res.json({success:false , message:'Unauthorziontal access!'})
    }
    if(error.name === 'TokenExpiredError    '){
        return res.json({success:false , message:'sesson expired try singin!'})
    }

    res.res.json({success:false, message:'sesson expired try singin!'})
}




        
    }else{
        res.json({success:false , message:'Unauthorziontal access!'})
    }
 }