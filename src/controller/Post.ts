import { RequestHandler } from 'express'
import Posts from '../models/Posts'
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
    const posts = await Posts.find()
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
    const posts = await Posts.find()
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
