import { Document } from 'mongoose'

export interface post extends Document {
  meme: string
  photo: ArrayBuffer
}
