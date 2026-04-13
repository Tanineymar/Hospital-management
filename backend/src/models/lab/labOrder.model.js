import mongoose from "mongoose";

const labOrderSchema = new mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    tests:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'labTest',
        required:true
    },
    department:{
        type:String,
        enum:['Pathology', 'Radiology', 'Microbiology', 'Biochemestry', 'Cardiology', 'Histopathology'],
        required:true
    },
    scheduledAt:{
        type:String,
        enum:['pending', 'in_progress', 'completed', 'cancelled'],
        default:'pending'
    },
},{timestamps : true})

const labOrderModel = mongoose.model('labOrder', labOrderSchema)
export default labOrderModel