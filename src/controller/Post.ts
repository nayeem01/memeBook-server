import { RequestHandler } from 'express'
import Posts from '../models/Posts'
import Redis from 'ioredis'

const redis = new Redis()

export const addPost: RequestHandler = async (req, res, next) => {
  try {
    const post = await Posts.create({
      user: req.user?._id,
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
    const posts = await Posts.find().populate('comments')
    if (posts.length === 0) {
      res.status(400).json({
        success: false,
        message: 'no data found',
      })
    }

    await redis.set('posts', JSON.stringify(posts), 'EX', 30)

    res.status(200).json({
      success: true,
      data: posts,
    })
  } catch (error) {
    next(error)
  }
}

// export const updatePostLike: RequestHandler = async (req, res, next) => {
//   try {
//     const { id } = req.params
//     const post = await Posts.findByIdAndUpdate(
//       id,
//       {
//         $push: { likes: req.likeOb },
//       },
//       { new: true, useFindAndModify: false }
//     )

//     res.status(200).json({
//       success: true,
//       data: post,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

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
export const updatePostPhoto: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const post = await Posts.findByIdAndUpdate(
      id,
      {
        photo: req.file?.path,
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
