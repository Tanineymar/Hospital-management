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
            .select('specialization consultationFee slots experience qualification isAvailable')

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
            .select("specialization consultationFee slots experience qualification about isAvailable")

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


// Patient can book appointment with doctor

async function bookAppointment(req , res) {
    try {
        
        const{doctorId , slot , date, reason} = req.body

        const doctor = await doctorModel.findOne({
            _id: doctorId,
            isAvailable: true
        })

        if(!doctor){
            return res.status(404).json({
                message:"Doctor not found or not available"
            })
        }

        const existing = await appointmentModel.findOne({
            doctor: doctorId,
            slot,
            date
        })

        if(existing){
            return res.status(400).json({message:"This slot is already booked"})
        }
        const appointment = await appointmentModel.create({
            patient: req.user._id,
            doctor: doctorId,
            slot,
            date,
            reason
        })

        res.status(201).json({
            message:"Appointment booked successfully",
            appointment
        })
    } catch (error) {
        
        res.status(500).json({
            message:"Failed to book appointment",
            error: error.message
        })
    }
}

// patient see own appointments with doctors

async function getMyAppointments(req ,res) {
    try {
        const appointments= await appointmentModel.find({patient : req.user._id})
        .populate({
            path: "doctor",
            select: 'specialization consultationFee',
            populate:{
                path:"user",
                select:'name email'
            }
        }).sort({date: -1})

        return res.status(200).json({
            message:"Appointments fetched successfully",
            appointments
        })
    } catch (error) {
        return res.status(500).json({
            message:"Failed to fetch appointments",
            error: error.message
        })
    }
}

// doctor see own appointments

async function getDoctorAppointments (req , res) {
    try {
        const doctor = await doctorModel.findOne({user: req.user._id})

        if(!doctor){
            return res.status(404).json({
                message:"Doctor profile not found"
            })
        }

        const appointments = await appointmentModel
        .find({doctor: doctor._id , isRejected: false})
        .populate("patient" , 'name email')
        .sort({date: -1})

        res.status(200).json({
            message:"Appintments fetched successfully",
            count: appointments.length,
            appointments
        })
    } catch (error) {
        res.status(500).json({
            message:"Failed to fetch appointments",
            error: error.message
        })
    }
}


// Doctor reject patient appointment

async function rejectAppointment(req ,res) {
    try {
        const doctor = await doctorModel.findOne({user: req.user._id})

        const appointment = await appointmentModel.findOneAndUpdate(
            {_id: req.params.id , doctor: doctor._id},
            {isRejected: true },
            {new: true}
        )

        if(!appointment){
            return res.status(404).json({message:"Appointment not found"})
        }

        res.status(200).json({
            message: "Appointment rejected",
            appointment
        })
    } catch (error) {
        return res.status(500).json({
            message:"Failed to reject",
            error: error.message
        })
    }
}

export default { getDoctors , getDoctorProfile , bookAppointment , getMyAppointments , getDoctorAppointments , rejectAppointment }


