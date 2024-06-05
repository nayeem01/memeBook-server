import mongoos from 'mongoose'
import endpoint from './endpoints.config'

const connectDB = async () => {
  const conn = await mongoos.connect(endpoint.URL)
  console.log(`MongoDB connected : ${conn.connection.host}`)
}

export default connectDB
