import { Document } from 'mongoose'

export interface user extends Document {
  meme: string
  password: string
  picture: string
  matchPassword: (pw: string) => Promise<boolean>
}
