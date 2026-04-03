import userModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'

async function userSingupController (req  , res) {
    try {
        const {name , email , password , role} = req.body

        const allowedRoles = ['patient', 'doctor' ,'lab_admin']

        if(!allowedRoles.includes(role)){
            return res.status(400).json({message:"Invalid role"})
        }

        const isUserExists = await userModel.findOne({email})
        
        if(isUserExists){
            return res.status(400).json({message:"User already registered with this Email"})
        }

        const status = role === 'patient' ? 'active':'pending';

        const user =  await userModel.create({
            name,
            email,
            password,
            role,
            status
        })

        res.status(200).json({
            message:"Registration successful",
            name:name,
            email:email,
            password:password,
            role:role,
            status:status
        })
    } catch (error) {
        res.status(500).json({
            message:"Registration failed"
        })
        console.log("error" ,error)
    }
}



