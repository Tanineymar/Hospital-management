import mongoose from 'mongoose'

const labTestSchema = new mongoose.Schema({
    testName:{
        type:String,
        islength:{min:3},
        required:true,
    },
    department:{
        type:String,
        enum:['Pathology', 'Radiology', 'Microbiology', 'Biochemestry', 'Cardiology', 'Histopathology'],
        required:true  
    },
    price:{type:Number , required:true},
    turnaroundHours:{type:Number , default:24},
    isActive:{type:Boolean , default:true}
})

const labTestModel =  mongoose.model('labTest' , labTestSchema)
export default labTestModel