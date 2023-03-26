const express = require('express');

const router = express.Router();
const {
    createUser,
    userSignIn,
    uploadProfile,
    signOut,
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

router.post('/create-user', userVlidation, createUser);
router.post('/sign-in', validateUserSignIn, userVlidation, userSignIn);
router.post('/sign-out', isAuth, signOut);
router.post(
    '/upload-profile',
    isAuth,
    uploads.single('profile'),
    uploadProfile
);

module.exports = router;