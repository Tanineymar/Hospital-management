import express from 'express'
import adminController from "../../controllers/admin.controller.js";

const router =  express.Router()

router.get('/applications/pending' , adminController.getPendingApplications)
router.patch('/applications/:id/approve' , adminController.approveApplication)

export default router