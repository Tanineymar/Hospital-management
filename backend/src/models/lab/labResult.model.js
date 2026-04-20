import mongoose from 'mongoose'

const labResultSchema = new mongoose.Schema({
    Order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"labOrder",
        required:true
    },
    uploadedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    reportUrl: {
        type:String,
        required:true
    },
    
},{timestamps:true})

const labResultModel = mongoose.model('labResult', labResultSchema)
export default labResultModel