import labTestModel from "../models/lab/labTest.model.js";

async function createTest(req ,res) {
    try {
        const{testName , department , price , turnaroundHours ,isActive } =  req.body

        const test = await labTestModel.create({
            testName: testName,
            department:department,
            price:price,
            turnaroundHours: turnaroundHours,
            isActive: isActive
        })

        return res.status(201).json({
            message:"Lab Test created successfully",
            test
        })
    } catch (error) {
        return res.status(500).json({
            message:"Lab test not created",
            error: error.message
        })
    }
    
}

export default createTest