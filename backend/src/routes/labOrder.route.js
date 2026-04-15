import express from 'express'
import placeOrder from "../controllers/labOrder.controller.js";
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router()

router.post('/', verifyToken, placeOrder)

export default router