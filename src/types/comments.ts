import { Document } from 'mongoose'
export interface comment extends Document {
  userID: Number
  comment: String
  matchID: (pw: string) => Promise<boolean>
}
