import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },

    applyingFor:{
        type:String,
        enum:["doctor", "lab_admin"],
        required:true
    },
    licenseNumber:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    }
} , {timestamps:true})

export default applicationSchema