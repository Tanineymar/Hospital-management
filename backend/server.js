import dns from 'dns'
dns.setServers(["1.1.1.1" ,"8.8.8.8"])
import { configDotenv } from 'dotenv'
configDotenv()

import app from './src/app.js'
import connectDB from './src/db/db.js'

connectDB()


app.listen(process.env.PORT || 3000 , ()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`)
})
