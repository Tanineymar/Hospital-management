import express from 'express'
import authController from '../controllers/auth.controller.js'
import authValidation from '../validations/auth.validation.js'
import verifyToken from '../middleware/verifyToken.js'
const router = express.Router()

router.post('/signup', authValidation.signupValidation ,verifyToken, authController.userSignupController )
router.post('/login' ,authValidation.loginValidation ,verifyToken,  authController.userLoginController)

export default router
