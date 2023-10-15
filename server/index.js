import express, { json } from "express";
import cors from 'cors'
import { connectToDb } from "./config/mongodb.js";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js"
import taskRoutes from "./routes/task.js"

const app = express()
config()
app.use(json())
app.use(cors())
app.disable('x-powered-by')

//api endpoints
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/task', taskRoutes)

app.use((err, req, res) => {
    const status = err.status || 500
    const message = err.message || 'Something went wrong'
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

const PORT = process.env.PORT || 8000


connectToDb().then(() => {
    try {
        app.listen(PORT, () => {
            console.log(`Server connected to port ${PORT}`)
        })
    } catch (error) {
        console.log("can't connect to server")
    }
}).catch((error) => {
    console.log('Invalid database connection')
})