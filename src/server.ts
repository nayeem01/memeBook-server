import { json } from 'body-parser'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import cookieParser from 'cookie-parser'
import connectDB from './config/db'
import endpoint from './config/endpoints.config'

import auth from './routes/auth'
import post from './routes/post'
import comment from './routes/comment'
import metrics from './routes/metrics'
// import like from './routes/like'

const app = express()
const PORT = endpoint.PORT || 5000

connectDB()
app.use(morgan('combined'))
app.use('/uploads', express.static('uploads'))
app.use(cookieParser())
app.use(json())
app.use(cors())

app.use('/api', auth)
app.use('/api', post)
app.use('/api', comment)
// app.use('/api', like)

app.use('', metrics)

app.listen(PORT, () => console.log(`server is running on ${PORT}`))
