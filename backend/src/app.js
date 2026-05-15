import dotenv from 'dotenv'

dotenv.config();

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js'
import applicationRouter from './routes/application.route.js'
import adminRouter from './routes/admin/application.route.js'
import doctorProfileRouter from './routes/doctor/doctor.routes.js'
import labTest from './routes/admin/labTest.route.js'
import bookTest from './routes/labOrder.route.js'
import doctorList from './routes/doctor.route.js'
import paymentRoutes from './routes/payment.route.js'
const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(cookieParser())
app.use(express.json())




// signup /login 
app.use('/api/auth' , authRouter)
app.use('/api/lab-orders' , bookTest)

// doctor / lab staff
app.use('/api' , applicationRouter)

// doctor profile 
app.use("/api/doctor" , doctorProfileRouter )

// ADMIN pending applications
app.use('/api', adminRouter)

// ADMIN approve / reject
app.use("/api" , adminRouter)
app.use("/api" , adminRouter)

// ADMIN create lab test
app.use('/api/lab-tests' , labTest)

app.use('/api' , doctorList)

// payment
app.use('/api/payment' , paymentRoutes )



export default app
