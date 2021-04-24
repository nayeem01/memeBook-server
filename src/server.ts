import { json } from 'body-parser'
import express from 'express'
import morgan from 'morgan'
import connectDB from './config/db'
import endpoint from './config/endpoints.config'
import post from './routes/post'

const app = express()

connectDB()
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(json())

app.use('/api', post)

const PORT = endpoint.PORT
app.listen(PORT, () => console.log(`server is runnig on ${PORT}`))
