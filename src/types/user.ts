import { Document } from 'mongoose'

export interface user extends Document {
  id: string
  meme: string
  password: string
  picture: string
  matchPassword: (pw: string) => Promise<boolean>
}
