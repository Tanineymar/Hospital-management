import doctorModel from "../models/doctor.model.js";

async function getdDoctorProfile (req , res) {
    try {
        const doctor =  await doctorModel
        .findOne({ user: req.user._id })
        .populate('user', 'name email')

        if(!doctor){
            return res.status(404).json({
                message:"Doctor profile not found."
            })
        }

        res.status(200).json({
            doctor
        })

    } catch (error) {
        return res.status(500).json({
            message:"get Doctor profile error",
            error: error.message
        })
    }
}