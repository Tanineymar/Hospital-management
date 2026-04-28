import razorpay from '../db/razorpay.config.js'
import paymentModel from '../models/payment.model.js'
import appointmentModel from '../models/appointment.model.js'
import labOrderModel from "../models/lab/labOrder.model.js"
import labTestModel from '../models/lab/labTest.model.js'
import crypto from 'crypto'

async function createOrder(req , res) {
    try {
        const{amount , type , referenceId} = req.body

        const order = await razorpay.orders.create({
            amount: amount*100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        })
        
        await paymentModel.create({
            patient: req.user._id,
            type,
            referenceId,
            amount,
            razorpayOrderId: order.id
        })

        res.status(200).json({
            message:"Order created successfully",
            order
        })
    } catch (error) {
        res.status(500).json({
            message:"Failed to create order",
            error: error.message
        })
    }
}


async function verifyPayment(req ,res) {
    try {
        const{razorpayOrderId , razorpayPaymentId , razorpaySignature , type , appointmentData , labData} =req.body

        const sign = razorpayOrderId + "|" + razorpayPaymentId;
        const expectedSign = crypto
        .createHmac("sha256" , process.env.RAZORPAY_KEY_SECRET)
        .update(sign)
        .digest("hex")

        if(expectedSign !== razorpaySignature){
            return res.status(400).json({message:"Invalid payment signature"})
        }

        await paymentModel.findOneAndUpdate(
            {razorpayOrderId},
            {razorpayPaymentId , status:"paid"}
        )
        
        let booking;

        if(type == 'appoinmtent'){
            booking =  await appointmentModel.create({
                patient: req.user._id,
                doctor: appointmentData.doctorId,
                slot: appointmentData.slot,
                date: appointmentData.date,
                reason: appointmentData.reason
            })
        }

        if(type == "lab"){
            const tests =  await labTestModel.find({_id:{$in: labData.testIds}})
            const departmentMap = {};

            tests.forEach(test =>{
                if(!departmentMap[test.department]){
                    departmentMap[test.department]=[];
                }
                departmentMap[test.department].push(test._id)
            })
        }

        const orders = [];
        for(const department in departmentMap){
            const order =  await labOrderModel.create({
                patient: req.user._id,
                patientInfo: labData.patientInfo,
                tests: departmentMap[department],
                department,
                scheduledAt: labData.scheduledAt
            })
            orders.push(order)
        }
        booking = orders;

         res.status(200).json({
            message: "Payment successful & Booking confirmed",
            booking
        });
    } catch (error) {
        res.status(500).json({
            message:"Payment verification failed",
            error: error.message
        })
    }
}

async function getMyPayments(req, res) {
    try {
        const payments = await paymentModel
            .find({ patient: req.user._id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Payments fetched successfully",
            payments
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch payments",
            error: error.message
        });
    }
}

export default { createOrder, verifyPayment, getMyPayments };