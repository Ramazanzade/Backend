const express = require('express');
const User = require('../../models/user');

const router = express.Router();
const {
    createUser,
    userSignIn,
    uploadProfile,
    signOut,
    GetAll,
    Delete,
    Upload,
    Put,
} = require('../contrulers/user');
const { isAuth } = require('../../Middlewares/auth');
const {
    validateUserSignUp,
    userVlidation,
    validateUserSignIn,
} = require('../../Middlewares/validation/user');

const multer = require('multer');

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('invalid image file!', false);
    }
};
const uploads = multer({ storage, fileFilter });

router.post('/create-user', validateUserSignUp, userVlidation, createUser);
router.post('/sign-in', validateUserSignIn, userVlidation, userSignIn);
router.post('/sign-out', isAuth, signOut);
router.get('/',GetAll);
router.post(
    '/upload-profile',
    isAuth,
    uploads.single('profile'),
    uploadProfile
);
router.delete('/delete/:id',Delete);
router.post('/users/:id/upload', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.send(user);
      } else {
        res.send('User not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  router.put('/users/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.send(updatedUser);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
// router.post('/confrim ' ,async(req,res)=>{
//     try {
//        const {email} =req.body
//        if(!email) throw Error("email is required!") 
//     } catch (error) {
        
//     }
// })

module.exports = router;