import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true
    },
    slot:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true
    }
},{timestamps:true})

const appointmentModel = mongoose.model("Appointment", appointmentSchema)
export default appointmentModel