import userModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'

// Register
async function userSignupController(req, res) {
    try {
        const { name, email, password, role = "patient", department } = req.body

        const isUserExist = await userModel.findOne({ email: email })
        if (isUserExist) {
            return res.status(400).json({ message: "Email is already registered" })
        }

        const user = await userModel.create({
            name,
            email,
            password,
            role,
            department
        })

        const token = jwt.sign({ userId: user._id, role: user.role , name:user.name , department:user.department }, process.env.JWT_SECRET, { expiresIn: '10d' })

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        })

        res.status(201).json({
            
            message: "Registred successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department
            }
        })
    } catch (error) {
        console.log("ERROR", error)
        res.status(500).json({
            message: "Registration failed"
        })
    }
}


// login

async function userLoginController(req, res) {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email }).select('+password')

        if (!user) {
            return res.status(401).json({
                message: "Email or password is invalid"
            })
        }

        const isvalidPassword = await user.comparePassword(password)
        if (!isvalidPassword) {
            return res.status(401).json({
                message: "Password is Invalid"
            })
        }

        const token = jwt.sign({ userId: user._id, role: user.role, department: user.department }, process.env.JWT_SECRET, { expiresIn: "10d" })

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 10 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            
            message:"Login successful",
            user:{
                id: user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                department: user.department
            }
        })

    } catch (error) {
        console.log("Error" , error)
        res.status(500).json({
            message:"Login failed"
        })
    }

}

export default { userSignupController  , userLoginController}