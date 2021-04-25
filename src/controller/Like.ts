import { RequestHandler } from 'express'
import Likes from '../models/Likes'
import { like } from '../types/likes'
declare global {
  namespace Express {
    interface Request {
      likeOb: like
    }
  }
}
export const addLike: RequestHandler = async (req, res, next) => {
  try {
    const like = await Likes.create({
      count: req.body.count,
    })
    req.likeOb = like
    next()
  } catch (error) {
    next(error)
  }
}

export const getLikes: RequestHandler = async (req, res, next) => {
  try {
    const likes = await Likes.find()
    res.status(200).json({
      success: true,
      data: likes,
    })
  } catch (error) {
    next(error)
  }
}
