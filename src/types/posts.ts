import { Document, Schema } from 'mongoose'

export interface post extends Document {
  user: Schema.Types.ObjectId | string
  meme: string
  photo: ArrayBuffer
  likes: ArrayBuffer
  comments: ArrayBuffer
  matchID: (pw: string) => Promise<boolean>
}
