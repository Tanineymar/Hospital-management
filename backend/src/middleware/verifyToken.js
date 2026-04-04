import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js';

async function verifyToken(req , res ,next) {
    try {
        const token = req.cookies?.token || req.header.authorization?.split('')[1];
        if(!token){
            return res.status(401).json({
                message:"Unauthorized - No token provided"
            })
        }

        const decoded =  jwt.verify(token , process.env.JWT_SECRET);
        

        const user =  await userModel.findById(decoded.userId).select('-password')

        if(!user){
            return res.status(401).json({
                message:"Unauthorized - User not found"
            })
        }
         req.user = user;
         next()
    } catch (error) {
        res.status(401).json({
            message:"Unauthorized - Invalid token"
        })
    }

}

export default verifyToken