import { RequestHandler } from 'express'
import Comments from '../models/Comments'
import Posts from '../models/Posts'

export const addComment: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params

    const post = await Posts.findById(id).populate('comments')

    if (post) {
      const newComment = await Comments.create({
        user: req.user?._id,
        comment: req.body.comment,
      })

      const savedComment = await newComment.save()

      if (Array.isArray(post.comments)) post.comments.push(savedComment._id)

      await post.save()

      res.status(201).json({ success: true, comment: savedComment })
    }
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

export const updateCommentInfo: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const comment = await Comments.findByIdAndUpdate(
      id,
      {
        comment: req.body.comment,
      },
      { new: true, useFindAndModify: false }
    )

    res.status(200).json({
      success: true,
      data: comment,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteComment: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const comment = await Comments.findByIdAndDelete(id)
    if (comment) {
      res.status(200).json({
        success: true,
        data: {},
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'can not find post',
      })
    }
  } catch (error) {
    next(error)
  }
}
