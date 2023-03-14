const {Users} = require('../../models/users')
const jwt = require('jsonwebtoken')
exports.userSingup = async (res,req)=>{
   const {name , surname , email , fin } = res.json(req.body);
    const isnewuser = await Users.isEmailInUse(email);
    if(!isnewuser)
        return res.json({
            success:false,
            message:'This email is already in user,try sing-in'
        });
    
        const user=await User({
    name,
    email,
    surname,
    fin
        });
        await user.save()
        res.json(user)
    
    }

exports.userSingin= async (req , res) =>{
    const {name , surname, fin } = res.json(req.body);
const user = await User.findOne({fin})
if(!user) return res.json({ success: false , message: ' Finlə bağlı müştəri tapılmadı'})

const isMatch = await user.compareFin(fin)
if(!isMatch) return res.json({ success: false , message: ' Finlə bağlı müştəri tapılmadı'});
const token=jwt.sign({userId:user._id},process.env.JWT_SECRET, {expiresIn:'1d'})
const userinfo = {
    name: user.name,
    surname:user.surname,
    email:user.email
}


res.json({success:true , user:userinfo, token})
}

