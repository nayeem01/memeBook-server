import { RequestHandler, RequestParamHandler } from 'express'
import Posts from '../models/Posts'
import Likes from '../models/Likes'
import { post } from '../types/posts'

export const addPost: RequestHandler = async (req, res, next) => {
  try {
    const post = await Posts.create({
      meme: req.body.meme,
      photo: req.file.path,
    })
    res.status(200).json({
      success: true,
      data: post,
    })
  } catch (error) {
    next(error)
  }
}

export const getPost: RequestHandler = async (req, res, next) => {
  try {
    const posts = await Posts.find().populate('likes')
    if (posts.length === 0) {
      res.status(400).json({
        success: false,
        message: 'no data found',
      })
    }
    res.status(200).json({
      success: true,
      data: posts,
    })
  } catch (error) {
    next(error)
  }
}

export const updatePost: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    console.log(req.likeOb)
    const post = await Posts.findByIdAndUpdate(
      id,
      {
        $push: { likes: req.likeOb },
      },
      { new: true, useFindAndModify: false }
    )

    res.status(200).json({
      success: true,
      data: post,
    })
  } catch (error) {
    next(error)
  }
}
