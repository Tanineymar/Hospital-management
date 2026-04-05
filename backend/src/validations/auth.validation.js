import {body , validationResult} from 'express-validator'


async function validateResult(req , res , next) {
    const error = validationResult(req)

    if(!error.isEmpty()){
        return res.status(401).json({ message:"Validation failed" , error:error.array()})
    }
    next()
}

const signupValidation = [
    body("name")
    .isString().withMessage("Name must be in characters.")
    .notEmpty().withMessage("Name is required.")
    .isLength({min:3 , max:20})
    .withMessage("Name must be in 3 and 20 characters"),

    body("email")
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Password must be 6 characters long."),

    body("password")
    .notEmpty().withMessage("Password is required.")
    .isLength({min:6 , max:20}).withMessage("Password must be 6 characters long."),

    validateResult
]

const loginValidation = [
    body("email")
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Invalid email address."),

    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({min:6 , max:20}).withMessage("Password must be 6 characters long."),
    
    validateResult
]

export default {signupValidation , loginValidation}