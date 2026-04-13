import express from 'express'
import doctorProfile from '../../controllers/doctor.controller.js'
import verifyToken from '../../middleware/verifyToken.js'
const router = express.Router()

router.get('/profile/me', verifyToken , doctorProfile.getDoctorProfile)
router.patch('/profile/update' , verifyToken , doctorProfile.updateDoctorProfile)

export default router