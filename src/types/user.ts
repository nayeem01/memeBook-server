import { Document } from 'mongoose'

export interface user extends Document {
  id: string
  name: string
  password: string
  picture: string
  resetPasswordToken: string
  restPasswordExpire: Date
  matchPassword: (pw: string) => Promise<boolean>
  getSignedJwtToken(): string
}
