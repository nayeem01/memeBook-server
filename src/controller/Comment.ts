import { RequestHandler } from 'express'
import { fileURLToPath } from 'node:url'
import Comments from '../models/Comments'
import { comment } from '../types/comments'
declare global {
  namespace Express {
    interface Request {
      commentOb: comment
    }
  }
}
export const addComment: RequestHandler = async (req, res, next) => {
  try {
    const comment = await Comments.create({
      userID: req.user._id,
      comment: req.body.comment,
    })
    req.commentOb = comment
    next()
  } catch (error) {
    next(error)
  }
}

export const getComments: RequestHandler = async (req, res, next) => {
  try {
    const comment = await Comments.find()
    if (comment.length === 0) {
      res.status(400).json({
        success: false,
        message: 'no data found',
      })
    }
    res.status(200).json({
      success: true,
      data: comment,
    })
  } catch (error) {
    next(error)
  }
}
