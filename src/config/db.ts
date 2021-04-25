import mongoos from 'mongoose'
import endpoint from './endpoints.config'

const connectDB = async () => {
  const conn = await mongoos.connect(endpoint.URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log(`MongoDB connected : ${conn.connection.host}`)
}

export default connectDB
