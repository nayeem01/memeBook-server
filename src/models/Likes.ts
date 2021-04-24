import { model, Schema } from 'mongoose'
import { like } from '../types/likes'

const LinkeSchema: Schema = new Schema(
  {
    count: {
      type: Number,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  { timestamps: true }
)
export default model<like>('Link', LinkeSchema)
