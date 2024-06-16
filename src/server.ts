import { json } from 'body-parser'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import http from 'http'
import { Server } from 'socket.io'

import cookieParser from 'cookie-parser'
import connectDB from './config/db'
import endpoint from './config/endpoints.config'

import auth from './routes/auth'
import post from './routes/post'
import comment from './routes/comment'
// import like from './routes/like'

const app = express()
const PORT = endpoint.PORT || 5000

const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

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

server.listen(PORT, () => console.log(`server is runnig on ${PORT}`))
