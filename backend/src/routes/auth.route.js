import express from 'express'
import authController from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register' ,authController.userSignupController )
router.post('/login' , authController.userLoginController)

export default router
