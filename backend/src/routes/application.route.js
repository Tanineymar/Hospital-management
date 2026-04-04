import express from 'express'
import applicationValidation from '../validations/application.validation.js'
import apply from '../controllers/application.controller.js'


const router = express.Router()

router.post('/apply' ,applicationValidation , apply.applicationController )

export default router