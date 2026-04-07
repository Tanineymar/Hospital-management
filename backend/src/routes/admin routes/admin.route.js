import express from 'express'
import adminController from "../../controllers/admin.controller.js";
import verifyToken from '../../middleware/verifyToken.js';


const router =  express.Router()

router.get('/applications/pending' , verifyToken , adminController.getPendingApplications)
router.patch('/applications/:id/approve' , verifyToken , adminController.approveApplication)
router.patch('/applications/:id/reject' , verifyToken , adminController.rejectApplication)

export default router