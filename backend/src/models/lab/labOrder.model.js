import mongoose from "mongoose";

const labOrderSchema = new mongoose.Schema({
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    patientInfo: {
        name:{
            type:String,
            required: true
        },
        age:{
            type:Number,
            required: true
        },
        gender:{
            type:String,
            enum:['male', 'female', 'other'],
            required:true
        },
        bloodGroup:{
            type:String,
            enum:['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            required: true
        },
        phone:{
            type:Number
        }
    },

    tests:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'labTest'
    }],

    department:{
        type:String,
        enum:['Pathology', 'Radiology', 'Microbiology', 'Biochemestry', 'Cardiology', 'Histopathology'],
        required:true  
    },
    scheduledAt: {type: Date , required: true},

    status:{
        type: String,
        enum:['pending', 'in_progress', 'completed', 'cancelled'],
        default: 'pending'
    }
},{timestamps: true})

const labOrderModel = mongoose.model('labOrder', labOrderSchema)
export default labOrderModel