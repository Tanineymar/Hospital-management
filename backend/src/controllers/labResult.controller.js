import labResultModel from "../models/lab/labResult.model.js";
import labOrderModel from "../models/lab/labOrder.model.js";

async function uploadResult(req , res) {
    try {
        const {orderId, reportUrl, remarks} = req.body

        const order = await labOrderModel.findOne({
            _id: orderId,
            department: req.user.department
        })

        if(!order){
            return res.status(404).json({
                message:"Order not found or not your department"
            })
        }

        if(order.status !== "completed"){
            return res.status(400).json({
                message:"Please mark the order as completed first"
            })
        }

        const existing =  await labResultModel.findOne({ order: orderId })
        if(existing){
            return res.status(400).json({
                message:"Result already uploaded for this order"
            })
        }

        const result = await labResultModel.create({
            order: orderId,
            uploadedBy: req.user._id,
            reportUrl,
            remarks
        })

        res.status(200).json({
            message:"Result uploaded successfully",
            result
        })
    } catch (error) {
        res.status(500).json({
            message:"Result upload failed",
            error:error.message
        })
    }
}

export default uploadResult