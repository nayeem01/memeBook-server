import { model, Schema } from 'mongoose'
import { like } from '../types/likes'

const LikeSchema: Schema = new Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
    },
  },
  { timestamps: true }
)
export default model<like>('Like', LikeSchema)
