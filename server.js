import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dataRoutes from './routes/dataRoutes.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/data', dataRoutes);

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})