const { check, validationResult } = require('express-validator');

exports.validateUserSignUp = [
    check('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required!')
        .isString()
        .withMessage('Must be a valid name!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be within 3 to 20 character!'),
    check('surname')
        .trim()
        .not()
        .isEmpty()
        .withMessage('surname is required!')
        .isString()
        .withMessage('Must be a valid surname!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be within 3 to 20 character!'),
    check('email').normalizeEmail().isEmail().withMessage('Invalid email!'),
    check('fin')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Fin is empty!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Password must be 3 to 20 characters long!'),

];

exports.userVlidation = (req, res, next) => {
    const result = validationResult(req).array();
    if (!result.length) return next();

    const error = result[0].msg;
    res.json({ success: false, message: error });
};

exports.validateUserSignIn = [
    check('fin')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required!')
        .isString()
        .withMessage('Must be a valid name!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be within 3 to 20 character!'),
];