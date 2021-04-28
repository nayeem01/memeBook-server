import { RequestHandler } from 'express'
import Post from '../models/Posts'

export const isOwner: RequestHandler = async (req, res, next) => {
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
