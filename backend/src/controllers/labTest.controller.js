import labTestModel from "../models/lab/labTest.model.js";


// ADMIN CREATE TEST
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

// PATIENT SEES ALL ACTIVE TEST

async function getTests(req , res) {
    try {
        const filter = {isActive :true}
        if(req.query.department) filter.department = req.query.department;
        const tests =  await labTestModel.find(filter)
        
        return res.status(201).json({
            message:"Test fetched successfully.",
            tests
        })
    } catch (error) {
         return res.status(500).json({
            message:"Test fetched Unsuccessful.",
            error: error.message
        })
    }    
}

// UPDATE LAB TEST CARD

async function updateTest(req , res){
    try {
        const {id} =  req.params;
        const{testName , department , price , turnaroundHours ,isActive } =  req.body

        const test = await labTestModel.findByIdAndUpdate(
            id,
            { $set: { testName, department, price, turnaroundHours, isActive } },
            { new: true, runValidators: true }
        );

        if(!test){
            return res.status(404).json({
                message:"Lab test not found"
            });
        }

        return res.status(200).json({
            message:"Lab test updated successfully",
            test
        })

    } catch (error) {
        return res.status(500).json({
            message:"Lab test update failed",
            error: error.message
        })
    }
}

//DELETE LAB TEST CARD
async function deleteLabTest(req , res){
    try {
        const{id}= req.params
        const deleteTest = await labTestModel.findByIdAndDelete(id)

        return res.status(200).json({
            message:"Lab test deleted successfully",
            deleteTest
        })
    } catch (error) {
        return res.status(500).json({
            message:"Failed to delete lab test",
            error: error.message
        })
    }
    
}


export default {createTest , getTests , updateTest , deleteLabTest}