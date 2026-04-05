import express from 'express'
import authController from '../controllers/auth.controller.js'
import authValidation from '../validations/auth.validation.js'

const router = express.Router()

router.post('/signup', authValidation.signupValidation , authController.userSignupController )
router.post('/login' , authValidation.loginValidation , authController.userLoginController)

export default router
