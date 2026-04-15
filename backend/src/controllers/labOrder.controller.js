import labOrderModel from "../models/lab/labOrder.model.js";
import labTestModel from "../models/lab/labTest.model.js";

async function placeOrder(req , res) {
    try {
        const {testIds, scheduledAt, patientInfo} = req.body

        const tests = await labTestModel.find({_id: { $in: testIds}})

        const departmentMap = {};
        tests.forEach(test =>{
            if(!departmentMap[test.department]){
                departmentMap[test.department] = [];
            }
            departmentMap[test.department].push(test._id)
        })

        const orders = []
        for(const department in departmentMap){
            const order = await labOrderModel.create({
                patient: req.user._id,
                patientInfo,
                tests: departmentMap[department],
                department,
                scheduledAt
            })
            orders.push(order);
        }

        res.status(200).json({
            message:"Lab test booked successfully.",
            orders

        })
    } catch (error) {
        return res.status(500).json({
            message:"Booking unsucessfull",
            error: error.message
        })
    }
}

export default placeOrder