import express from 'express'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js'
import applicationRouter from './routes/application.route.js'
const app = express()

app.use(express.json())
app.use(cookieParser())

// signup /login 
app.use('/api/auth' , authRouter)

// doctor / lab staff
app.use('/api' , applicationRouter)


export default app
