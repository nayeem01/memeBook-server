import * as dotenv from 'dotenv'
import { resolve } from 'path'
dotenv.config({ path: resolve(__dirname, './config.env') })

export default {
  URL: process.env.URL ?? '',
  PORT: process.env.PORT ?? '',
  REDIS_PORT: process.env.REDIS_PORT ?? '',
  JWT_KEY: process.env.JWT_SECRET ?? '',
  JWT_EXPIRE: process.env.JWT_EXPIRE ?? '',
  JWT_COOKIE_EXPIRE: process.env.JWT_COOKIE_EXPIRE ?? '',
}
