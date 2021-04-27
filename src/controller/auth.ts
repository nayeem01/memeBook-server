import User from '../models/User'
import { RequestHandler, Response } from 'express'
import { user } from '../types/user'
import endpoint from '../config/endpoints.config'

export const register: RequestHandler = async (req, res, next) => {
  const { name, password } = req.body
  const user = await User.create({
    name,
    password,
  })
  user.save({ validateBeforeSave: false })
  sendTokenResponse(user, 200, res)
}

export const login: RequestHandler = async (req, res, next) => {
  const { name, password } = req.body

  if (!name || !password) {
    res.status(400).json({
      success: false,
      message: 'Please provide username and password',
    })
  } else {
    const user: user | null = await User.findOne({ name }).select('+password')

    if (!user) {
      res.status(400).json({
        success: false,
        message: 'user not found',
      })
    } else {
      const isMatch = await user.matchPassword(password)
      if (!isMatch) {
        res.status(400).json({
          success: false,
          message: 'Invalid credentials',
        })
      } else {
        sendTokenResponse(user, 200, res)
      }
    }
  }
}

export const logout: RequestHandler = async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    data: {},
  })
}

const sendTokenResponse = (user: any, statusCode: number, res: Response) => {
  const token = user.getSignedJwtToken()
  const options = {
    expires: new Date(
      Date.now() + (endpoint.JWT_COOKIE_EXPIRE as any) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  })
}
