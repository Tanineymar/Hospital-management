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
    },
    reason:{
        type:String,
        // maxlength: [10, "Reason must be at least 10 characters"]
    },
    isRejected:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const appointmentModel = mongoose.model("Appointment", appointmentSchema)
export default appointmentModel