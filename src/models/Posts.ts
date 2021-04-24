import { model, Schema } from 'mongoose'
import { post } from '../types/posts'
const PostSchema: Schema = new Schema(
  {
    meme: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
)
export default model<post>('Post', PostSchema)
