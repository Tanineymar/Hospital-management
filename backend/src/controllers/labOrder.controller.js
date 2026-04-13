import labOrderModel from "../models/lab/labOrder.model.js";
import labTestModel from "../models/lab/labTest.model.js"

async function placeOrder(req , res){
    try {
        const{testIds , scheduledAt}= req.body

        const tests = await labTestModel.find({
            _id:{$in : testIds}
        })

        const departmentMap = {};
        tests.forEach(test =>{
            if(!departmentMap[test.department]){
                departmentMap[test.department]=[]
            }
            departmentMap[test.department].push(test._id);
        })

        const orders = [];
        for(const department in departmentMap){
            const order = await labOrderModel.create({
                patient:req.user._id,
                test: departmentMap
            })
        }
    } catch (error) {
        
    }    
}