import express from 'express'
import paymentController from '../controllers/payment.controller.js'
import verifyToken from '../middleware/verifyToken.js'


const router = express.Router()

router.post('/create' , verifyToken , paymentController.createOrder);
router.post('/verify' , verifyToken , paymentController.verifyPayment);
router.get('/my' ,verifyToken ,paymentController.getMyPayments)

export default router