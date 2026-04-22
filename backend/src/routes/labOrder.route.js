import express from 'express'
import Order from "../controllers/labOrder.controller.js";
import verifyToken from '../middleware/verifyToken.js';
import uploadResult from '../controllers/labResult.controller.js';
const router = express.Router()

// patient order labtest
router.post('/', verifyToken, Order.placeOrder)
router.get('/my' , verifyToken , Order.getMyOrders)


// lab staff
router.get('/department', verifyToken , Order.getDepartmentOrders)
router.patch('/status/:id' , verifyToken , Order.updateOrderStatus)
router.post("/results/upload" ,verifyToken , uploadResult )

export default router

