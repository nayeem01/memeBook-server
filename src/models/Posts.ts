import { model, Schema } from 'mongoose'
import { post } from '../types/posts'
import CommentSchema from './Comments'

const PostSchema = new Schema<post>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    meme: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Like',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: CommentSchema,
      },
    ],
  },
  { timestamps: true }
)

PostSchema.methods.matchID = async function (enteredUserID: string) {
  return (await enteredUserID) == this.userID
}

export default model<post>('Post', PostSchema)
