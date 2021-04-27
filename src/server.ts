import { json } from 'body-parser'
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import connectDB from './config/db'
import endpoint from './config/endpoints.config'
import post from './routes/post'
import like from './routes/like'
import auth from './routes/auth'
const app = express()

connectDB()
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(cookieParser())
app.use(json())

app.use('/api', post)
app.use('/api', like)
app.use('/api', auth)
const PORT = endpoint.PORT
app.listen(PORT, () => console.log(`server is runnig on ${PORT}`))
