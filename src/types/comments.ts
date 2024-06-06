import { Document, Schema } from 'mongoose'
export interface comment extends Document {
  user: Schema.Types.ObjectId | string
  comment: String
  matchID: (pw: string) => Promise<boolean>
}

declare global {
  namespace Express {
    interface Request {
      commentOb: comment
    }
  }
}
