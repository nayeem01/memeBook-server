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
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Like',
      },
    ],
  },
  { timestamps: true }
)
export default model<post>('Post', PostSchema)
