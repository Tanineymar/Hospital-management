import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    refrenceId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    amount:{
        type:Number, 
        required: true
    },
    razorpayOrderId: {type: String},
    razorpayPaymentId: {type: string},
    status:{
        type: String,
        enum:["created" , "paid" , "failed"],
        default: "created"
    }
} , {timestamps: true})

const paymentModel = mongoose.model('payment', paymentSchema)

export default paymentModel