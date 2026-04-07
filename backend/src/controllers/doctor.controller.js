
import doctorModel from "../models/doctor.model.js";

async function getDoctorProfile(req , res) {
    try {
        if(req.user.role !== 'doctor'){
            return res.status(403).json({
                message:"Access denied"
            })
        }

        const doctor = await doctorModel
        .findOne({user: req.user._id})
        .populate("user" , "name email")

        if(!doctor){
            return res.status(200).json({
                doctor:null,
                message:"Doctor profile not created yet."
            })
        }

        return res.status(200).json({
            message:"Doctor profile fetched successfully.",
            doctor
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Get profile error",
            error:error.message
        })
    }
}

async function updateDoctorProfile (req , res){
    try {
        if(req.user.role !== 'doctor'){
            return res.status(403).json({
                message:"Access denied"
            })
        } 

        const{specialization, licenseNumber, qualification, experience, about, slots, consultationFee} = req.body

        if(!specialization || !licenseNumber || !qualification || !experience || !about || !slots || !consultationFee ||!Array.isArray(slots) ||
            slots.length === 0){
                return res.status(400).json({
                    message:"All fields are required to complete profile"
                })
            }
        
            let doctor = await doctorModel.findOne({user: req.user._id})

            if(!doctor){
                // first time create
                doctor =  await doctorModel.create({
                    user: req.user._id,
                    specialization,
                    licenseNumber,
                    qualification,
                    experience: Number(experience),
                    about,
                    slots,
                    consultationFee,
                    isProfileComplete:true
                })
            }else{
               doctor.specialization = specialization;
               doctor.licenseNumber = licenseNumber;
               doctor.experience = experience;
               doctor.about = about;
               doctor.slots= slots;
               doctor.consultationFee = consultationFee
               doctor.isProfileComplete = true

               await doctor.save()

            }

            res.status(200).json({
                message:"Doctor profile updated",
                doctor
            })
        
    } catch (error) {
        return res.status(500).json({
            message:"update doctor profile error",
            error : error.message
        })
    }
}

export default {getDoctorProfile , updateDoctorProfile}