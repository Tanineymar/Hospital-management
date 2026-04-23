import express from 'express'
import appointmentController from '../controllers/appointment.controller.js'

const router = express.Router()

router.get('/doctor' , appointmentController.getDoctors)
router.get('/doctor/profile/:id' , appointmentController.getDoctorProfile )

export default router