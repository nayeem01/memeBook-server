import jwt from 'jsonwebtoken'
import User from '../models/User'
import { RequestHandler } from 'express'
import endpoint from '../config/endpoints.config'

// Protect routes
export const protection: RequestHandler = async (req, res, next) => {
  let token: string
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    if (req.headers.authorization) {
      token = req.headers.authorization?.split(' ')[1] || ''

      if (!token) {
        res.status(401).json({
          success: false,
          message: 'Not authorized to access this route',
        })
      } else {
        try {
          const decoder: any = jwt.verify(token, endpoint.JWT_KEY)
          const temp = await User.findById(decoder.id)
          if (temp !== null) req.user = temp
          next()
        } catch (err) {
          return next(err)
        }
      }
    } else {
      res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      })
    }
  }
}
