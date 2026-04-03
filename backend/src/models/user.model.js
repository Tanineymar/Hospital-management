import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , "Name is required."]
    },
    email:{
        type:String,
        required:[true ,"Email is required."],
        lowercase:true,
        trim:true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/  , 'Please fill a valid email address.'],
        unique:true
    },
    Password:{
        type:String,
        required:[true ,"Password is required"],
        minlength:[6 , "Password should be contain more then 6 characters."],
        select:false
    },
    role:{
        type:String,
        enum:["patient","doctor", "lab_admin" ,"admin"],
        default:"patient",
        required:true
    },
    status:{
        type:String,
        enum:["active" , 'pending' ,'rejected'],
        default:"active"
    }

},{timestamps:true})


userSchema.pre("save" , async function () {
    if(!this.isModified("password")){
        return
    }
    const hash = await bcrypt.hash(this.Password ,10)
    this.Password = hash
    return
    
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password , this.password)
}



const userModel  = mongoose.model("User" , userSchema)