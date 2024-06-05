import { json } from 'body-parser'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import cookieParser from 'cookie-parser'
import connectDB from './config/db'
import endpoint from './config/endpoints.config'

import post from './routes/post'
import like from './routes/like'
import auth from './routes/auth'
import comment from './routes/comment'

const app = express()
const PORT = endpoint.PORT || 5000

connectDB()
app.use(morgan('combined'))
app.use('/uploads', express.static('uploads'))
app.use(cookieParser())
app.use(json())

app.use('/api', post)
// app.use('/api', like)
// app.use('/api', auth)
// app.use('/api', comment)

app.listen(PORT, () => console.log(`server is runnig on ${PORT}`))
