import { RequestHandler } from 'express'
import Posts from '../models/Posts'
// import { client } from '../config/redis.config'

export const addPost: RequestHandler = async (req, res, next) => {
  try {
    const post = await Posts.create({
      userID: req.user._id,
      meme: req.body.meme,
      photo: req.file?.path,
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
      .populate('likes', 'count')
      .populate('comments', 'comment')
    if (posts.length === 0) {
      res.status(400).json({
        success: false,
        message: 'no data found',
      })
    }
    // console.log(posts)
    // client.setex(haskey, 3600, JSON.stringify(posts))
    res.status(200).json({
      success: true,
      data: posts,
    })
  } catch (error) {
    next(error)
  }
}

export const updatePostLike: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
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

export const updatePostComment: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const post = await Posts.findByIdAndUpdate(
      id,
      {
        $push: { comments: req.commentOb },
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

export const updatePostInfo: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const post = await Posts.findByIdAndUpdate(
      id,
      {
        meme: req.body.meme,
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
export const deletePost: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const post = await Posts.findByIdAndDelete(id)
    if (post) {
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
