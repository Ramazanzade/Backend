const router = require('express').Router();
const { userSingup, userSingin } = require('../contrulers/usersContruler')
const jwt = require('jsonwebtoken')
const { uservalidationSingup, uservalidation, uservalidationSingin } = require('../../Middlewares/uservalidation')
const { isAuth } = require('../../Middlewares/auth')
const multer = require('multer')
const sharp = require('sharp')
const file = require('../../models/File')
const strong = multer.memoryStorage();

const filefilter = (req, file, cb) => {
    if (file.minetype.startsWith('imge')) {
        cb(null, true)
    } else {
        cd('not file found', false)
    }
}
const uploads = multer({ strong, filefilter })
router.post('./create-user', uservalidationSingup, uservalidation, userSingup)
router.post('./sign-in', userSingin, uservalidation, uservalidationSingin)
router.post('./create-post', isAuth)
router.post('/upload', isAuth, uploads.single('profile'), async (req, res) => {
    const { user } = req;
    if (!user)
        return res
            .status(401)
            .json({ success: false, message: 'File update' });

    try {
        const file = req.file.buffer
        const { width, height } = await sharp(file).metadata()
        const img = await sharp(file).resize(Math.round(width * 0.5), Math(height * 0.5)).toBuffer()

        await file.findbyidandUpdate(user._id, { img })
        res.status(201).json({ success: true, message: 'Your file update! ' })

    } catch (error) {
        console.log('Error file', error.message);
        res.status(500).json({ success: true, message: 'Your file  do not update' })

    }



})




module.exports = router;