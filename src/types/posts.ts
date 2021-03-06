import { Document } from 'mongoose'

export interface post extends Document {
  userID: string
  meme: string
  photo: ArrayBuffer
  likes: ArrayBuffer
  matchID: (pw: string) => Promise<boolean>
}
