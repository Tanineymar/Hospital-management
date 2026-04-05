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

    // Doctor fields
    body("specialization")
    .if(body("applyingFor").equals("doctor"))
        .notEmpty().withMessage("Specialization is required for doctor"),

    body("licenseNumber")
    .if(body("applyingFor").equals("doctor"))
        .isLength({min:6 , max:15}).withMessage("License Number is incorrect.")
        .notEmpty().withMessage("License Number is required for doctor."),

    body("qualification")
    .if(body("applyingFor").equals("doctor"))
        .notEmpty().withMessage("Qualification is required for doctor."),

    // lab staff

    body("department")
    .if(body("applyingFor").equals("lab_staff"))
        .notEmpty().withMessage("Department is required for lab staff."),


    vaildateResult
]

export default applicationValidation