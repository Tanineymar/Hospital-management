import { trusted } from "mongoose";
import appointmentModel from "../models/appointment.model.js";
import doctorModel from '../models/doctor.model.js'


// patient fetch all doctors
async function getDoctors(req, res) {
    try {
        const doctors = await doctorModel.find({
            isAvailable: true,
            isProfileComplete: true
        }).populate('user', 'name email')
            .select('specialization consultationFee slots experience qualification')

        res.status(200).json({
            message: "Doctors fetched successfully",
            doctors
        })
    } catch (error) {
        res.statu(500).json({
            message: "Failed to fetch doctors",
            error: error.message
        })
    }
}

// patient see one doctor profile

async function getDoctorProfile(req, res) {
    try {
        const doctor = await doctorModel.findById(req.params.id)
            .populate("user", 'name email')
            .select("specialization consultationFee slots experience qualification about")

        if (!doctor) {
            res.status(404).json({
                message: "Doctor not found"
            })
        }

        res.status(200).json({
            message: "Doctor profile fetched successfully",
            doctor
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch doctor profile",
            error: error.message
        });
    }
}




export default { getDoctors , getDoctorProfile }


