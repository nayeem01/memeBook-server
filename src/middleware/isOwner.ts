import { RequestHandler } from 'express'
import Post from '../models/Posts'
import Comment from '../models/Comments'

export const isOwnerOFPost: RequestHandler = async (req, res, next) => {
  const post = await Post.findById(req.params.id)

  if (
    post !== null &&
    req.user !== undefined &&
    post.user.toString() === (req.user._id as string).toString()
  ) {
    next()
  } else {
    res.status(401).json({
      success: true,
      message: 'you are not the owner of this post',
    })
  }
}

export const isOwnerOfComment: RequestHandler = async (req, res, next) => {
  const comment = await Comment.findById(req.params.id)

  if (
    comment !== null &&
    req.user !== undefined &&
    comment.user.toString() === (req.user._id as string).toString()
  ) {
    next()
  } else {
    res.status(401).json({
      success: false,
      message: 'you are not the owner of this comment',
    })
  }
}
