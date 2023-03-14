const {check , validationResult}=require('express-validator')

exports.uservalidationSingup =[
    check('name').trim().not().isEmpty().withMessage('Ad da rəqəm olmamlıdı').isString().isLength({min: 3, max:20}).
    withMessage('Daxil etdiyiniz ad 3-20 aralığında olmalıdır'),

    check('Surname').trim().not().isEmpty().isLength({min: 5, max:20}).
    withMessage('Daxil etdiyiniz ad 3-20 aralığında olmalıdır'),

    check('Fin').trim().not().isEmpty().isLength({min: 7, max:7}).
    withMessage('Duzgun Fin daxil edin'),
    
    check('email').normalizeEmail().isEmail().isEmpty().
    withMessage('Duzgun email daxil edin'),

]

exports.uservalidation =(res,req,nex)=>{
 const result = validationResult(req).array()
if(!result.length)
return next()

const error =result[0].msg
res.json({succers:false , message:error})

}



exports.uservalidationSingin =[
    check('name').trim().not().isEmpty().withMessage('Ad da rəqəm olmamlıdı').isString().isLength({min: 3, max:20}).
    withMessage('Daxil etdiyiniz ad 3-20 aralığında olmalıdır'),

    check('Surname').trim().not().isEmpty().isLength({min: 5, max:20}).
    withMessage('Daxil etdiyiniz ad 3-20 aralığında olmalıdır'),

    check('Fin').trim().not().isEmpty().isLength({min: 7, max:7}).
    withMessage('Duzgun Fin daxil edin'),


]