import { RequestHandler } from 'express'
import { client } from '../config/redis.config'

export const cache: RequestHandler = async (req, res, next) => {
  const post: string = 'post'
  client.get(post, (err, data) => {
    if (err) throw err

    if (data !== null) {
      res.status(200).json({
        success: true,
        meta_data: 'from cache',
        data: JSON.parse(data),
      })
    } else {
      next()
    }
  })
}
