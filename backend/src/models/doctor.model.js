import mongoose from 'mongoose'

const slotSchema = new mongoose.Schema({
    day:{
        type:String,
        enum:['Mon', "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        required:[true , "Day is required."]
    },
    startTime:{
        type:String
    },
    endTime:{
        type:String
    },
    isAvailable:{
        type:Boolean,
        default:true
    }
})

const doctorSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    specializatoin :{type: String , required: true},
    licenseNumber:     { type: String, required: true },
    qualification:     { type: String },
    experience:        { type: Number },
    consultationFee:   { type: Number, default: 0 },
    about:             { type: String },
    slots:             [slotSchema],
    isProfileComplete: { type: Boolean, default: false },
}, {timestamps: true})

const doctorModel = mongoose.model('Doctor' , doctorSchema)

export default doctorModel