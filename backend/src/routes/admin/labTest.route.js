import express from 'express'
import labTest from '../../controllers/labTest.controller.js'
const router =  express.Router()

router.post('/create' , labTest.createTest)
router.get('/' , labTest.getTests)
router.patch('/update/:id' , labTest.updateTest)

export default router