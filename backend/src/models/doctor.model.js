import mongoose from 'mongoose'

const slotSchema = new mongoose.Schema({
    day: {
        type: String,
        enum: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
    }
    ,
    startTime: { type: String },
    endTime: { type: String },
    isAvailable: { type: Boolean, default: true }
})

const doctorSchema = new mongoose.Schema({
     user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    specialization: { type: String,},
    licenseNumber: { type: String,  },
    qualification: { type: String },
    experience: { type: Number },
    consultationFee: { type: Number, default: 0 },
    about: { type: String },
    slots: [slotSchema],
    isAvailable:{type:Boolean , default: false},
    isProfileComplete: { type: Boolean, default: false },
}, {timestamps: true})

const  doctorModel = mongoose.model("Doctor" , doctorSchema)


export default doctorModel