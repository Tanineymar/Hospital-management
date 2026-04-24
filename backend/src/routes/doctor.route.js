import express, { Router } from 'express'
import appointmentController from '../controllers/appointment.controller.js'
import verifyToken from '../middleware/verifyToken.js'
const router = express.Router()

router.get('/doctor' , appointmentController.getDoctors)
router.get('/doctor/profile/:id' , appointmentController.getDoctorProfile )

router.post('/appointment/book' , verifyToken , appointmentController.bookAppointment)

router.get('/appointments/my' , verifyToken , appointmentController.getMyAppointments)
router.get('/appointments/doctor', verifyToken ,appointmentController.getDoctorAppointments)

router.patch('/appointment/reject/:id' , verifyToken  , appointmentController.rejectAppointment)
export default router