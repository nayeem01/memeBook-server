import { RequestHandler } from 'express'
import Post from '../models/Posts'
import Comment from '../models/Comments'

export const isOwnerOFPost: RequestHandler = async (req, res, next) => {
  const post = await Post.findById(req.params.id)

  if (post !== null && post.matchID(req.user._id)) {
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

  if (comment !== null && comment.matchID(req.user._id)) {
    next()
  } else {
    res.status(401).json({
      success: true,
      message: 'you are not the owner of this post',
    })
  }
}
