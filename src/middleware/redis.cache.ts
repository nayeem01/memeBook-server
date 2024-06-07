import { RequestHandler } from 'express'
import Redis from 'ioredis'

export const cache: RequestHandler = async (req, res, next) => {
  const redis = new Redis()

  try {
    const cacheData = await redis.get('posts')
    if (cacheData) {
      res.status(200).json({
        success: true,
        data: JSON.parse(cacheData),
      })
    } else {
      next()
    }
  } catch (error) {
    console.error(error)
  }
}
