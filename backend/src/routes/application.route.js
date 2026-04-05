import express from 'express'
import applicationValidation from '../validations/application.validation.js'
import applicationController from '../controllers/application.controller.js'
import verifyToken from '../middleware/verifyToken.js'

const router = express.Router()

router.post('/apply' , verifyToken , applicationValidation , applicationController )

export default router