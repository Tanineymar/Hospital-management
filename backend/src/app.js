import express from 'express'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js'
import applicationRouter from './routes/application.route.js'
import adminRouter from './routes/admin routes/admin.route.js'
import doctorProfileRouter from './routes/doctor routes/doctor.routes.js'
const app = express()

app.use(express.json())
app.use(cookieParser())

// signup /login 
app.use('/api/auth' , authRouter)

// doctor / lab staff
app.use('/api' , applicationRouter)

// doctor profile 
app.use("/api/doctor" , doctorProfileRouter )

// ADMIN pending applications
app.use('/api', adminRouter)

// ADMIN approve / reject
app.use("/api" , adminRouter)
app.use("/api" , adminRouter)




export default app
