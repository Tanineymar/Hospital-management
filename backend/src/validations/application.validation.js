import {body , validationResult} from 'express-validator'

async function vaildateResult(req ,res ,next) {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ message:"Validation failed", errors:errors.array()})
    }

    next();
    
}

const applicationValidation = [
    
    body("applyingFor")
    .notEmpty().withMessage("Applying for is required.")
    .isIn(["doctor",  "lab_staff"]).withMessage("Must be a doctor or lab staff"),

    body("specialization")
    .if(body("applyingFor").equals("doctor"))
        .notEmpty().withMessage("Specialization is required"),

    body("licenseNumber")
    .if(body("applyingFor").equals("doctor"))
        .notEmpty().withMessage("License Number is required"),

    body("qualification")
    .if(body("applyingFor").equals("doctor"))
        .notEmpty().withMessage("Qualification is required."),

    // lab staff

    body("department")
    .if(body("applyingFor").equals("lab_staff"))
        .notEmpty().withMessage("Department is required"),

    vaildateResult
]

export default applicationValidation