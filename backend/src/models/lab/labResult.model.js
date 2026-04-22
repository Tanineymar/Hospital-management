import mongoose from 'mongoose'

const labResultSchema = new mongoose.Schema({
    order:{
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
    remarks:{
        type: String,
    }
    
},{timestamps:true})

const labResultModel = mongoose.model('labResult', labResultSchema)
export default labResultModel