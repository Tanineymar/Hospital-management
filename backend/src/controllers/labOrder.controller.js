import labOrderModel from "../models/lab/labOrder.model.js";
import labTestModel from "../models/lab/labTest.model.js";



// Patient order lab test
async function placeOrder(req, res) {
    try {
        const { testIds, scheduledAt, patientInfo } = req.body

        const tests = await labTestModel.find({ _id: { $in: testIds } })

        const departmentMap = {};
        tests.forEach(test => {
            if (!departmentMap[test.department]) {
                departmentMap[test.department] = [];
            }
            departmentMap[test.department].push(test._id)
        })

        const orders = []
        for (const department in departmentMap) {
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
            message: "Lab test booked successfully.",
            orders

        })
    } catch (error) {
        return res.status(500).json({
            message: "Booking unsucessfull",
            error: error.message
        })
    }
}

// patient see own booked orders

async function getMyOrders(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const orders = await labOrderModel
            .find({ patient: req.user._id })
            .populate("tests", "testName department price")

        res.status(200).json({
            message: "Orders fetched successfullty",
            orders
        })
    } catch (error) {
        res.status(500).json({
            message: "Error to fetch orders",
            error: error.message
        })
    }

}

// Lab staff see orders of own department

async function getDepartmentOrders(req, res) {
    try {
          console.log("USER:", req.user);
        if (!req.user || !req.user.department) {
            return res.status(401).json({ message: "Unauthorized or no department" });
        }
        const orders = await labOrderModel.find({department: req.user.department,
            status:{$in: ['pending', 'in_progress']}
        })
        .populate("patient", 'name email')
        .populate("tests" , 'name')

        return res.status(200).json({
            message:"Patient orders fetched successfully",
            orders
        })
    } catch (error) {
        return res.status(500).json({
            message: "Orders are not fetched successfully",
            error: error.message
        })
    }
}


export default { placeOrder, getMyOrders , getDepartmentOrders }